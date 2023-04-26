let box = document.getElementById("box")
let wrapper = document.querySelector(".wrapper")
let content = wrapper.children[0]
let scroll = box.children[1]
let bar = scroll.children[0]
let hor = box.children[2]
let horbar = hor.children[0]
//bar高度 算比例关系
//box.offsetHeight/content.offsetHeight=height/scroll.offsetHeight
let height = (scroll.offsetHeight * wrapper.offsetHeight) / content.offsetHeight
bar.style.height = height + "px"
// 事件的开始
bar.onmousedown = function (e) {
  let spaceY = e.clientY - bar.offsetTop
  document.onmousemove = function (e) {
    e.preventDefault()
    let y = e.clientY - spaceY
    y = y < 0 ? 0 : y //最小值
    y =
      y > scroll.offsetHeight - bar.offsetHeight
        ? scroll.offsetHeight - bar.offsetHeight
        : y //最大值
    bar.style.top = y + "px"

    //滚动条的移动距离/文字div的移动距离=滚动条最大的移动距离/文字div的最大移动距离
    //文字div的移动距离=滚动条的移动距离*文字div的最大移动距离/滚动条最大的移动距离
    var moveY =
      (y * (content.offsetHeight - wrapper.offsetHeight)) /
      (scroll.offsetHeight - bar.offsetHeight)
    //设置文字div的移动距离
    wrapper.scrollTop = moveY
  }
}
//松开时取消移动事件
document.onmouseup = function () {
  document.onmousemove = null
}

// 横向滚动条
// 宽度计算 比例关系
// box.offsetWidth / content.offsetWidth = width / hor.offsetWidth
let width = (hor.offsetWidth * wrapper.offsetWidth) / content.offsetWidth
horbar.style.width = width + "px"
// 事件的开始
horbar.onmousedown = function (e) {
  let spaceX = e.clientX - horbar.offsetLeft
  document.onmousemove = function (e) {
    e.preventDefault()
    let x = e.clientX - spaceX
    x = x < 0 ? 0 : x //最小值
    x =
      x > hor.offsetWidth - horbar.offsetWidth
        ? hor.offsetWidth - horbar.offsetWidth
        : x //最大值
    horbar.style.left = x + "px"
    var moveX =
      (x * (content.offsetWidth - wrapper.offsetWidth)) /
      (hor.offsetWidth - horbar.offsetWidth)
    //设置文字div的移动距离
    wrapper.scrollLeft = moveX
  }
}
//松开时取消移动事件
document.onmouseup = function () {
  document.onmousemove = null
}

// 绑定滚动事件
wrapper.addEventListener(
  "scroll",
  function () {
    let y =
      (wrapper.scrollTop * (scroll.offsetHeight - bar.offsetHeight)) /
      (content.offsetHeight - wrapper.offsetHeight)
    bar.style.top = y + "px"

    let x =
      (wrapper.scrollLeft * (hor.offsetWidth - horbar.offsetWidth)) /
      (content.offsetWidth - wrapper.offsetWidth)
    horbar.style.left = x + "px"
  },
  false
)


// 初始化
