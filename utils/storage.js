/*
 * 本地化存储
 */

/*
 * 本地化存储操作类
 */
function LocalData() {
  let localdata;

  if (!tt.getStorageSync('gephb_localdata')) {
    localdata = {
      'gid': 0,
      'userinfo': {
        'name': '',
        'avatar': '',
        'sex': ''
      },
      'postvisits': Array(),
      'postlikes': Array(),
      'postshares': Array(),
      'postfavorites': Array(),
      'poststarreviews': Array(),
      'categorylikes': Array(),
      'categoryshares': Array(),
      'categoryfavorites': Array(),
      'categorystarreviews': Array(),
      'taglikes': Array(),
      'tagshares': Array(),
      'tagfavorites': Array(),
      'tagstarreviews': Array()
    };
    tt.setStorageSync('gephb_localdata', localdata);
  } else {
    localdata = tt.getStorageSync('gephb_localdata');
  } //获取本地化存储中的键


  this.get_storage = function (key) {
    if (localdata.hasOwnProperty(key)) return localdata[key];
    return false;
  }; //增加本地化存储数据


  this.add_storage = function (key, value) {
    localdata[key] = value;
    return tt.setStorageSync('gephb_localdata', localdata);
  }; //保存本地化存储的值


  this.update_storage = function (key, value) {
    return this.add_storage(key, value);
  }; //清空本地化数据


  this.destroy_storage = function () {
    tt.removeStorageSync('gephb_localdata');
  };

  if (LocalData.instance) {
    return LocalData.instance;
  }

  LocalData.instance = this;
} //初始化实例


let data = new LocalData(); //设置用户ID

function set_gid(gid) {
  return data.update_storage('gid', gid);
} //获取当前用户ID


function get_gid() {
  return data.get_storage('gid');
} //判断当前用户是否访问过此页面


function is_visited() {
  var key = data.get_storage('postvisits');
  return key.indexOf(id) >= 0;
} //保存访问信息


function add_visit(id) {
  if (is_visited(id)) return false;
  var key = data.get_storage('postvisits');
  key.push(id);
  data.update_storage('postvisits', key);
} //判断当前用户是否点赞此页面


function is_liked() {
  if (arguments.length == 1) {
    var id = arguments[0];
    var page = 'post';
  } else if (arguments.length == 2) {
    var id = arguments[0];
    var page = arguments[1];
  }

  if (page == 'post') var key = data.get_storage('postlikes');else if (page == 'category') var key = data.get_storage('categorylikes');else if (page == 'tag') var key = data.get_storage('taglikes');
  return key.indexOf(id) >= 0;
} //保存点赞信息


function add_like() {
  if (arguments.length == 1) {
    var id = arguments[0];
    var page = 'post';
  } else if (arguments.length == 2) {
    var id = arguments[0];
    var page = arguments[1];
  }

  if (is_liked(id, page)) return true;

  if (page == 'post') {
    var key = data.get_storage('postlikes');
    key.push(id);
    return data.update_storage('postlikes', key);
  } else if (page == 'category') {
    var key = data.get_storage('categorylikes');
    key.push(id);
    return data.update_storage('categorylikes', key);
  } else if (page == 'tag') {
    var key = data.get_storage('taglikes');
    key.push(id);
    return data.update_storage('taglikes', key);
  }
} //判断用户是否分享过


function is_shared() {
  if (arguments.length == 1) {
    var id = arguments[0];
    var page = 'post';
  } else if (arguments.length == 2) {
    var id = arguments[0];
    var page = arguments[1];
  }

  if (page == 'post') var key = data.get_storage('postshares');else if (page == 'category') var key = data.get_storage('categoryshares');else if (page == 'tag') var key = data.get_storage('tagshares');
  return key.indexOf(id) >= 0;
} //保存分享信息


function add_share() {
  if (arguments.length == 1) {
    var id = arguments[0];
    var page = 'post';
  } else if (arguments.length == 2) {
    var id = arguments[0];
    var page = arguments[1];
  }

  if (is_shared(id, page)) return true;

  if (page == 'post') {
    var key = data.get_storage('postshares');
    key.push(id);
    return data.update_storage('postshares', key);
  } else if (page == 'category') {
    var key = data.get_storage('categoryshares');
    key.push(id);
    return data.update_storage('categoryshares', key);
  } else if (page == 'tag') {
    var key = data.get_storage('tagshares');
    key.push(id);
    return data.update_storage('tagshares', key);
  }
} //判断用户是否收藏过


function is_favorited() {
  if (arguments.length == 1) {
    var id = arguments[0];
    var page = 'post';
  } else if (arguments.length == 2) {
    var id = arguments[0];
    var page = arguments[1];
  }

  if (page == 'post') var key = data.get_storage('postfavorites');else if (page == 'category') var key = data.get_storage('categoryfavorites');else if (page == 'tag') var key = data.get_storage('tagfavorites');
  return key.indexOf(id) >= 0;
} //保存收藏信息


function add_favorite() {
  if (arguments.length == 1) {
    var id = arguments[0];
    var page = 'post';
  } else if (arguments.length == 2) {
    var id = arguments[0];
    var page = arguments[1];
  }

  if (is_favorited(id, page)) return true;

  if (page == 'post') {
    var key = data.get_storage('postfavorites');
    key.push(id);
    return data.update_storage('postfavorites', key);
  } else if (page == 'category') {
    var key = data.get_storage('categoryfavorites');
    key.push(id);
    return data.update_storage('categoryfavorites', key);
  } else if (page == 'tag') {
    var key = data.get_storage('tagfavorites');
    key.push(id);
    return data.update_storage('tagfavorites', key);
  }
} //判断用户是否评分


function is_rated() {
  if (arguments.length == 1) {
    var id = arguments[0];
    var page = 'post';
  } else if (arguments.length == 2) {
    var id = arguments[0];
    var page = arguments[1];
  }

  if (page == 'post') var key = data.get_storage('poststarreviews');else if (page == 'category') var key = data.get_storage('categorystarreviews');else if (page == 'tag') var key = data.get_storage('tagstarreviews');

  for (d of data) {
    if (d.id == id) return d['score'];
  }

  return false;
} //保存评分信息


function add_rate() {
  if (arguments.length == 2) {
    var id = arguments[0];
    var rate = arguments[1];
    var page = 'post';
  } else if (arguments.length == 3) {
    var id = arguments[0];
    var rate = arguments[1];
    var page = arguments[2];
  }

  if (page == 'post') var key = data.get_storage('poststarreviews');else if (page == 'category') var key = data.get_storage('categorystarreviews');else if (page == 'tag') var key = data.get_storage('tagstarreviews');

  if (is_rated(id, rate, page)) {
    for (var i in data) {
      var objectid = data[i]['id'];

      if (objectid == id) {
        key[i]['score'] = rate;
      }
    }
  } else {
    key.push({
      'id': id,
      'score': rate
    });
  }

  if (page == 'post') {
    data.update_storage('poststarreviews', key);
  } else if (page == 'category') {
    data.update_storage('categorystarreviews', key);
  } else if (page == 'tag') {
    data.update_storage('tagstarreviews', key);
  }

  return false;
}

module.exports = {
  storage: LocalData,
  set_gid: set_gid,
  get_gid: get_gid,
  is_visited: is_visited,
  add_visit: add_visit,
  is_liked: is_liked,
  add_like: add_like,
  is_shared: is_shared,
  add_share: add_share,
  is_favorited: is_favorited,
  add_favorite: add_favorite,
  is_rated: is_rated,
  add_rate: add_rate
};