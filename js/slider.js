;
+function(){
    function $(selector){
        // var firstChar = selector.slice(0,1);
        // if(firstChar.match(/#/g))
        return document.getElementById(selector);
    }
    var imgAmount = $("list").children.length;
    var dotBox = document.createElement("div");
    var frg = document.createDocumentFragment();
    dotBox.setAttribute("id","dot");
    for(var i=0;i<imgAmount;i++){
        className = i==0?"on":"";
        var dot = document.createElement("span");
        dot.setAttribute("class",className);
        dot.setAttribute("index",i+1);
        dotBox.appendChild(dot)
    }
    frg.appendChild(dotBox);
    var prevBtn = document.createElement("a");
    var nextBtn = document.createElement("a");
    var text = document.createTextNode("<");
    prevBtn.appendChild(text);
    prevBtn.setAttribute("id","prev");
    prevBtn.setAttribute("class","arrow");
    frg.appendChild(prevBtn);
    text = document.createTextNode(">");
    nextBtn.appendChild(text);
    nextBtn.setAttribute("id","next");
    nextBtn.setAttribute("class","arrow"); 
    frg.appendChild(nextBtn);           
    $("container").appendChild(frg);
    $("list").style.width=(imgAmount+2)*600+"px";
    var Slider = function(selector){
        this.ele = $(selector);
        this.list = $("list");
        this.imgAmount = imgAmount;
        this.index = 1;
        this.dot = dotBox.getElementsByTagName("span");
        this.prev = prevBtn;
        this.nextBtn = nextBtn;
        this.animated = false;
        this.init();
    }
    function clone(){
        var list = $("list").getElementsByTagName("img");
        var prevItem = list[0].cloneNode(true);
        var lastItem = list[list.length-1].cloneNode(true);
        $("list").appendChild(prevItem);
        $("list").insertBefore(lastItem,$("list").childNodes[0]);
    }
    clone();
    Slider.prototype = {
        constructor:Slider,
        init:function(){
            this.setSlider();
        },
        animate:function(offset){
            var self = this;
            var newLeft = parseInt(self.list.style.left) + offset;
            var time = 400;
            var interval = 10;
            var speed = offset/(time/interval);
            self.animated = true;
            function go(){
                if((speed<0&&parseInt(self.list.style.left)>newLeft)||(speed>0&&parseInt(self.list.style.left)<newLeft)){
                    self.list.style.left = parseInt(self.list.style.left)+speed + "px";
                    setTimeout(go,interval);
                }else{
                    //this.list.style.left = newLeft + "px";
                    if(newLeft>-600){
                        self.list.style.left = -600 * self.imgAmount + 'px';
                    }
                    if(newLeft<(-600 * self.imgAmount)) {
                        self.list.style.left = '-600px';
                    }
                    self.animated = false;
                }
            } 
            go(); 
            self.changeBtn();
        },
        setSlider:function(){
            var self = this;
            for(var i=0;i<this.dot.length;i++){
                self.dot[i].addEventListener("click",count,false)
            }
            self.prev.onclick = function(){
                if(self.animated){
                   return; 
                } 
                if(self.index==1){
                    self.index=self.imgAmount
                }else{
                    self.index= self.index-1;
                }                        
                self.animate(600);

            }
            self.nextBtn.onclick = function(){
                if(self.animated){
                   return; 
                } 
                if(self.index==self.imgAmount){
                    self.index=1
                }else{
                    self.index= self.index-0+1;
                }                        
                self.animate(-600);
            }
            self.ele.onmouseout = play;
            self.ele.onmouseover = stop;
            function count(){
                if(self.animated || this.className.match(/on/g)){
                   return; 
                } 
                var currentIndex = this.getAttribute("index");
                //var offset = parseInt(currentIndex - self.index)*600+600;
                var offset = parseInt(currentIndex - self.index)*(-600);
                self.index = currentIndex;
                self.animate(offset);
            }
            function play(){
                timer = setInterval(function(){self.nextBtn.click()},3000)
            }
            function stop(){
                clearInterval(timer);
            }
            play();
        },
        changeBtn:function(){
            for(var i=0;i<this.imgAmount;i++){
                if(this.dot[i].className.match(/on/g)){
                    this.dot[i].className=this.dot[i].className.replace(new RegExp(/on/g),"");
                    break;
                }
            }
            this.dot[this.index-1].className +=" on"; 
        }
    }
    window.Slider = Slider;
}()
new Slider("container");