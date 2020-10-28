const cron = require('node-cron');
const express = require('express');
const router = express.Router();
const jimp = require('jimp');
const fs = require('fs');
const request = require('request');
const http = require('https');
const moment = require('moment-timezone');

const unescape = require('lodash/unescape');

//app = express();

const options = {
  key: fs.readFileSync('key.pem'),
  cert: fs.readFileSync('cert.pem')
};

//const showRoutes = require('./routes/shows');

router.post(
  '',
  (req, res, next) => {
    console.log(req.body);
  }
)

function auto_update() {

let totalPages = 0;
let tagMasterList = [];
let tagNameList = [];
let masterArr = []
http.get('https://admin.hkcr.live/wp-json/wp/v2/posts?_embed&categories=14&per_page=9&page=1', (res) => {
  let data = '';
   res.on('data', (item) => {
     data += item;
   });

   res.on('end', () => {
     totalPages = res.headers['x-wp-totalpages'];
     getShows(1);
     getSchedule();
     getHighlights();
     getResidents();
  //   getUpcomingShows();
     getBlogPosts();
  //   setUpdatedTime();
   })
})

function downloadImage(uri, filename) {
  request.head(uri, (err, res, body) => {
    request(uri).pipe(fs.createWriteStream(filename));
  })
}

function getShows(page_num) {
  http.get('https://admin.hkcr.live/wp-json/wp/v2/posts?_embed&categories=14&per_page=9&page=' + page_num, (resp) => {
    let pageData = '';
  //  console.log('Started downloading page ' + page_num + '...')
    resp.on('data', (page) => {
      pageData += page;
    })

    resp.on('end', () => {
      let formattedPageData = JSON.parse(pageData);
      let showData = '';
      let pageList = [];
      let hasDownloadedAllData = false;
    //  let savedFile = fs.readFileSync('shows/shows_1.json');
    //  console.log(JSON.parse(savedFile))
         formattedPageData.forEach(pageItem => {

                  let tagList = [];
                  pageItem.tags.forEach(tag => {
                    let tagExists = false;
                    if(tagMasterList.length > 0) {
                      tagMasterList.forEach(tagItem => {
                        if(tag == tagItem) {
                          tagExists = true;
                        }
                      })
                      if (!tagExists) {
                        tagMasterList.push(tag);
                      }
                    } else {
                      tagMasterList.push(tag);
                    }
                  })
                  let featured_img = '';
                  let featured_thumb = '';
                  if(pageItem._embedded["wp:featuredmedia"] == undefined) {
                    featured_img = "DEFAULT";
                    featured_thumb = "DEFAULT";
                  } else {
                    featured_img = pageItem._embedded["wp:featuredmedia"][0].source_url;
                    // let newURL = featured_img.split('https://admin.hkcr.live/wp-content/uploads');
                    // let newURLArr = newURL[1].split('/');
                    // newURL = 'data/shows/images/' + newURLArr.splice(3, newURLArr.length).join('/');
                    // newThumbnailURL = 'data/shows/images/thumbnails/256/' + newURLArr.splice(3, newURLArr.length).join('/');
                    //   downloadImage(featured_img, newURL);
                      // console.log(newURL);
                      // jimp.read(newURL, (err, image) => {
                      //
                      //   image.resize(256,256).quality(60).write(newThumbnailURL);
                      // })
                      if(pageItem._embedded["wp:featuredmedia"][0].media_details !== undefined) {
                        if(pageItem._embedded["wp:featuredmedia"][0].media_details.sizes !== undefined) {
                          featured_thumb = pageItem._embedded["wp:featuredmedia"][0].media_details.sizes.thumbnail.source_url;
                      }
                    }


                  }
                  let titleArr = unescape(pageItem.title["rendered"]).split('&#8211;');
                  // console.log(titleArr);
                  let date = titleArr.pop();
                  // console.log(date);
                  let url = titleArr.join().trim().replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()
                  + date.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
                  // console.log(url);
                  showData = {
                    title: unescape(pageItem.title["rendered"]),
                    date: date,
                    url: url,
                    content: unescape(pageItem.content["rendered"]),
                    excerpt: unescape(pageItem.excerpt["rendered"].replace(/<[^>]*>/g, '')),
                    image_full: featured_img,
                    image_thumbnail: featured_thumb,
                    tags: pageItem.tags
                  }
                //  console.log(showData);
                  pageList.push(showData);
                //  console.log(pageItem.title["rendered"]);
       })
       let jsonPageData = JSON.stringify(pageList);
       fs.writeFileSync('data/_temp/shows_' + page_num + '.json', jsonPageData);
       process.stdout.clearLine();
       process.stdout.cursorTo(0);
       process.stdout.write('page ' + page_num + ' written to json!')
       //console.log('page ' + page_num + ' written to json!');
       if(page_num < totalPages){
       getShows(page_num + 1)
     } else {
       let jsonTotalPages = JSON.stringify(totalPages);
       fs.writeFileSync('data/shows/total_pages.json', jsonTotalPages);
       console.log('Shows finished downloading!')
       console.log('Now starting tags...')
       getTags(0);
     }
    })
  })
}

function getTags(tag_num) {
  http.get('https://admin.hkcr.live/wp-json/wp/v2/tags/' + tagMasterList[tag_num], (resp) => {
    let tagData = '';
    resp.on('data', (tag) => {
      tagData += tag;
    })

    resp.on('end',() => {
      let formattedTagData = JSON.parse(tagData);
      tagNameList.push(unescape(formattedTagData.name));
      if(tag_num <= tagMasterList.length) {
        getTags(tag_num + 1);
        process.stdout.clearLine();
        process.stdout.cursorTo(0);
        process.stdout.write('downloading ' + tag_num + ' of ' + tagMasterList.length);
      } else {
        console.log('Tag downloads complete');
        fs.writeFileSync('tag_id_list.json', tagMasterList);
        fs.writeFileSync('tag_name_list.json', tagNameList);
      //  console.log(tagMasterList);
      //  console.log(tagNameList);

        tagNameList.forEach(name => {
          let obj = {};
          obj[name] = [];
          masterArr.push(obj);
        })
    //    console.log(masterArr);
        updateTags(0);
      }
    })
});
}


function updateTags(tag_index) {
let newFile = '';
let real_index = tag_index + 1
let fileURI = './data/_temp/shows_' + real_index + '.json';
fs.readFile(fileURI, (err, file) => {
  if (err) {
    throw err;
  }
  const rawdata = JSON.parse(file);
  // let formattedFileData = JSON.stringify(file);
  rawdata.forEach(block => {
    block.tags.forEach((tag, index) => {
    let tagIndex = tagMasterList.indexOf(tag);
    let tagName = tagNameList[tagIndex];
    block.tags[index] = tagName;
    })

    block.tags.forEach((tag, index) => {
    let tagIndex = tagNameList.indexOf(tag);
    let tagName = tagNameList[tagIndex];
    masterArr[tagIndex][tagName].push(block);
    })
      let url = block.url.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()
      let singleJsonData = JSON.stringify(block);
      console.log('SHOW SAVED TO : ./data/shows/single/' + url + '.json');
      fs.writeFileSync('./data/shows/single/' + url + '.json', singleJsonData)
  })
  newFile = JSON.stringify(rawdata);
  newFileURI = './data/shows/shows_' + real_index + '.json'
  fs.writeFileSync(newFileURI, newFile);
  process.stdout.clearLine();
  process.stdout.cursorTo(0);
  process.stdout.write('shows_' + real_index + '.json has been edited!')
  if(real_index < totalPages) {
    updateTags(tag_index + 1);
  } else {

    masterArr.forEach(item => {
      for (const prop in item) {
        console.log(prop);
      //  console.log(item[prop].length);
        let fileArr = [];
        item[prop].forEach((show, index) => {
          let pageNumber = Math.ceil((index + 1) / 9);
          fileArr.push(show);
       if(((index + 1) % 9 == 0) || (index + 1 == item[prop].length)) {
          let fileArrJson = JSON.stringify(fileArr);
          let jsonIndex = JSON.stringify((index + 1) / 9);
          fs.writeFileSync('./data/shows/genres/_totals/' + prop.replace(/ /g, "_").toLowerCase() + '.json', jsonIndex)
          fs.writeFileSync('./data/shows/genres/' + prop.replace(/ /g, "_").toLowerCase() + '_' + pageNumber + '.json', fileArrJson);

          process.stdout.clearLine();
          process.stdout.cursorTo(0);
          process.stdout.write(prop + '_' + pageNumber + '.json has been created')
          fileArr = [];
       }
        })
      }
    })
    let jsonObj = JSON.stringify(masterArr);
    fs.writeFileSync('./data/shows/genres/master.json', jsonObj);
    console.log('Master genre JSON file created!');
    console.log('Updates finished! All files edited!');
    getUpcomingShows();
  }
})
}

function getSchedule() {
  http.get('https://admin.hkcr.live/wp-json/wp/v2/posts?_embed&categories=15', (resp) => {
    let data = '';
    resp.on('data', (schedule) => {
      data += schedule;
    })

    resp.on('end',() => {
      let formattedData = JSON.parse(data);
      let jsonData = JSON.stringify(formattedData);
      fs.writeFileSync('./data/schedule/schedule.json', jsonData);
      console.log('Schedule data written to /schedule/schedule.json')
    })
});
}

function getHighlights() {
  http.get('https://admin.hkcr.live/wp-json/wp/v2/posts?_embed&categories=164', (resp) => {
    let data = '';
    resp.on('data', (highlights) => {
      data += highlights;
    })

    resp.on('end',() => {
      let formattedData = JSON.parse(data);
      let jsonData = JSON.stringify(formattedData);
      fs.writeFileSync('./data/highlights/highlight_reel.json', jsonData);
      console.log('Highlight Reel data written to /highlight_reel/highlight_reel.json')
    })
});
}

function getResidents() {
  http.get('https://admin.hkcr.live/wp-json/wp/v2/posts?_embed&categories=177&per_page=100', (resp) => {
    let data = '';
    resp.on('data', (residents) => {
      data += residents;
    })

    resp.on('end', () => {
      let formattedData = JSON.parse(data);
      formattedData.forEach(item => {
        let url = item.title.rendered.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()
        let singleJsonData = JSON.stringify(item);
        fs.writeFileSync('./data/residents/single/' + url + '.json', singleJsonData)
      })
      let jsonData = JSON.stringify(formattedData);
      fs.writeFileSync('./data/residents/residents.json', jsonData);
      console.log('Residents data written to /residents/residents.json');
    })
  })
}

function getUpcomingShows() {
  http.get('https://admin.hkcr.live/wp-json/wp/v2/posts?_embed&categories=178&per_page=24', (resp) => {
    let data = '';
    resp.on('data', (upcoming) => {
      data += upcoming;
    })

    resp.on('end', () => {
      let tagName = '';
      let formattedData = JSON.parse(data);
      formattedData.forEach(item => {
        let url = item.title.rendered.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()
      //   console.log(item.tags[0]);
      //   if (item.tags.length !== 0) {
      //   let tagID = item.tags[0];
      //   let tagIndex = tagMasterList.indexOf(tagID);
      //   tagName = tagNameList[tagIndex];
      // }


        let singleJsonData = JSON.stringify(item);
      // if (item.tags.length !== 0) {
      //   tagName = JSON.stringify(tagName).replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase();
      //   fs.writeFileSync('./data/upcoming-shows/residents/' + tagName + '.json', singleJsonData)
      // }
        fs.writeFileSync('./data/upcoming-shows/single/' + url + '.json', singleJsonData)
      })
      let jsonData = JSON.stringify(formattedData);
      fs.writeFileSync('./data/upcoming-shows/upcoming_shows.json', jsonData);
      console.log('Upcoming show data written to /upcoming-shows/upcoming_shows.json');
      setUpdatedTime();
    })
  })
}
// Find tag ID in tag ID master ID list
// Match ID to tag in master name list
// use tag name to create json file

function getBlogPosts() {
  http.get('https://admin.hkcr.live/wp-json/wp/v2/posts?_embed&categories=179', (resp) => {
    let data = '';
    resp.on('data', (posts) => {
      data += posts;
    })

    resp.on('end', () => {
      let formattedData = JSON.parse(data);
      formattedData.forEach(item => {
        let url = item.title.rendered.replace(/[^a-zA-Z0-9]+/g, "-").toLowerCase()
        let singleJsonData = JSON.stringify(item);
        fs.writeFileSync('./data/blog/single/' + url + '.json', singleJsonData)
      })
      let jsonData = JSON.stringify(formattedData);
      fs.writeFileSync('./data/blog/blog.json', jsonData);
      console.log('Blog data written to /blog/blog.json');
    })
  })
}

function setUpdatedTime() {
  let date = JSON.stringify(moment().tz('Asia/Hong_Kong').format('LLL'));
  fs.writeFileSync('./data/timestamp.json', date)
}

  console.log('running a task on auto update');
}

module.exports = router;
// http.createServer(options, (req,res) => {
//   console.log('starting server')
//   res.writeHead(200);
//   res.end('Ending Node https server...');
// }).listen(8888);
