const app = getApp()
const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}
const isAuth=()=> {
  if (JSON.stringify(app.globalData.position) === '{}') {
    wx.showModal({
      title: '提示',
      content: '未获取到位置信息！',
    })
    return false;
  }
  if (JSON.stringify(app.globalData.userInfo) === '{}') {
    wx.showModal({
      title: '提示',
      content: '未获取到用户信息！',
    })
    return false;
  }
  return true;
}

module.exports = {
  formatTime: formatTime,
  isAuth: isAuth
}
