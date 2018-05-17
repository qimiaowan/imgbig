/**
 * 插件调用方法；
 * 
 * new imgBig(parent,templte).addevent()
 * parent 这个参数是 你想让图片点击放大最外层的父元素
 * templte 这个是模板最外层的父元素
 */
!function(win,doc){ 
    var imgBig = function(parent,templte){
        var temClientX,temMoveX,num;
        function imgBigFun(parent,templte){
            this.info = doc.querySelector(parent);  // 事件委托
            this.tem = doc.querySelector(templte);  //模板
            var imga = doc.querySelectorAll("img"); //获取页面所有图片
            var ul = doc.createElement("ul");      //创建一个容器
            for(var i = 0; i<imga.length;i++){          //把所有图片便利进容器中
                var li = doc.createElement("li");
                var img = doc.createElement("img");
                img.setAttribute("data-index",i);
                imga[i].setAttribute("data-index",i);
                img.src = imga[i].src;
                li.appendChild(img);
                ul.appendChild(li);
            };
            ul.style.width = 10*imga.length+"rem";   //初始化容器的宽度
            this.tem.appendChild(ul);                    //重新加载 容器 添加进模板中
            //调用事件函数
            // this.addevent(); 
        };
        imgBigFun.prototype.addevent = function(){
            var tem = this.tem;
            var temImg = tem.getElementsByTagName("img");       //获取容器中所有图片
            var temImgParent = temImg[0].parentNode.parentNode;
            this.info.addEventListener("click",function(e){
                //点击图片展现大图事件调用
                temImgShow(e,temImg,tem);
            });
            if('ontouchstart' in win){
                 // 触摸点击事件
                 temImgParent.addEventListener("touchstart",function(e){
                    touchDown(e);
                }); 
                // 触摸判断事件
                temImgParent.addEventListener("touchend",function(e){
                    var temImgLength = temImg.length;
                    touchEnd(e,this,temImgLength);
                });
            }else{
                 // 触摸点击事件
                 temImgParent.addEventListener("mousedown",function(e){
                    touchDown(e);
                }); 
                // 触摸判断事件
                temImgParent.addEventListener("mouseup",function(e){
                    var temImgLength = temImg.length;
                    touchEnd(e,this,temImgLength);
                });
            };
            //关闭模板事件
            tem.parentNode.addEventListener("click",function(e){
                temClose(e,this);
            });
        };
        // 触摸点击
        function touchDown(e){
            if(e.target.tagName.toLowerCase()!="img"){
                return;
            }
            num = (e.target.getAttribute("data-index"));
            if(e.clientX){
                temClientX = e.clientX;
            }else{
                temClientX = e.changedTouches[0].clientX;
            }
            e.stopPropagation();
            e.preventDefault();
            return false;
        };
        // 触摸判断
        function touchEnd(e,that,temImgLength){
            if(e.target.tagName.toLowerCase()!="img"){
                return;
            }
            if(e.clientX){
                temMoveX = e.clientX;
            }else{
                temMoveX = e.changedTouches[0].clientX;
            }
            if(temMoveX-temClientX<-10){
                // 右
                var r = Math.min(++num,temImgLength-1);
                that.style.transform = "translateX("+(-10*r)+"rem)";
            }else if(temMoveX-temClientX>10){
                // 左
                var l = Math.max(--num,0);
                that.style.transform = "translateX("+(-10*l)+"rem)";
            }
            e.stopPropagation();
            e.preventDefault();
            return false;
        };
        //点击图片展现大图
        function temImgShow(e,temImg,tem){
            if(e.target.tagName.toLowerCase()=="img"){
                tem.parentNode.style.display = "flex";   //显示模板
                temImg[0].parentNode.parentNode.style.transform="translateX("+(-10*(e.target.getAttribute("data-index")))+"rem)";
            }
            e.stopPropagation();
            e.preventDefault();
            return false;
        };
        //关闭模板 
        function temClose(e,that){
            if(e.target.tagName.toLowerCase()=="img"){
                return false;
            }
            that.style.display = "none";
            e.stopPropagation();
            e.preventDefault();
            return false;
        };
        return new imgBigFun(parent,templte);
    };
    win.imgBig = imgBig;
}(window,document);
