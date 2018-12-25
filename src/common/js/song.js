import {commonParams} from 'api/config.js'
import axios from 'axios'

export default class Song {
  constructor({id, mid, singer, name, album, durtaion, image, url}) {
    this.id = id
    this.mid = mid
    this.singer = singer
    this.name = name
    this.album = album
    this.durtaion = durtaion
    this.image = image
    this.url = url
  }
}

export function getMusic(mid) {
  const url = '/api/music'

  const data = Object.assign({}, commonParams, {
    // guid和cid会过期
    songmid: mid,
    filename: 'C400' + mid + '.m4a',
    guid: 6732159104,
    platform: 'yqq',
    loginUin: 0,
    hostUin: 0,
    needNewCode: 0,
    g_tk: 5381,
    uin: 0,
    cid: 205361747,
    // categoryId: 10000000,
    // pcachetime: +new Date(),
    format: 'json'
  })

  return axios.get(url, {
    params: data
  }).then((res) => {
    return Promise.resolve(res.data)
  })
}

export function createSong(musicData, songVkey) {
  return new Song({
    id: musicData.songid,
    mid: musicData.songmid,
    singer: filterSinger(musicData.singer),
    name: musicData.songname,
    album: musicData.albumname,
    durtaion: musicData.interval,
    image: `https://y.gtimg.cn/music/photo_new/T002R300x300M000${musicData.albummid}.jpg?max_age=2592000`,
    url: `http://isure.stream.qqmusic.qq.com/C400${musicData.songmid}.m4a?vkey=${songVkey}&guid=6732159104&uin=0&fromtag=66`
  })
}

function filterSinger (singer) {
  let ret = []
  if (!singer) {
    return ''
  }
  singer.forEach((s) => {
    ret.push(s.name)
  })
  return ret.join('/')
}