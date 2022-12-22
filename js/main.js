// SLIDER


class SLIDER {
    constructor(obj) {
        this.slider = document.querySelector(obj.el)
        this.sliderBox = this.slider.querySelector('.slider__box')
        this.sliderItem = Array.from(this.sliderBox.children)
        this.next = this.slider.querySelector('.slider__next')
        this.prev = this.slider.querySelector('.slider__prev')
        this.width = this.slider.clientWidth
        this.height = this.slider.clientHeight
        this.moveSize = this.height
        this.activeSlide = 0
        this.autoplay = obj.autoplay
        this.speed = obj.speed
        this.timeInterval = obj.time < this.speed + 1000 || obj.time === undefined ? 5000 : obj.time
        // if (this.next && this.prev > this.autoplay) {
        //     this.autoplay = setTimeout(() => {
                
        //     }, 5000);
        // } else if (this.next && this.prev < this.autoplay) {
        //     this.next && this.prev == undefined
        // }
        console.log(this.timeInterval);
        this.sliderBox.style = `position:relative;
                                overflow:hidden;
                                height: ${this.height}px;`
        this.sliderItem.forEach((el, i) => {
            el.style = `position:absolute;
                        height:${this.height}px;
                        width:${this.width}px;`
            if (i != this.activeSlide && i != this.sliderItem.length - 1) {
                el.style.transform = `translateY(${this.moveSize}px)`
            } else if (i == this.sliderItem.length - 1) {
                el.style.transform = `translateY(-${this.moveSize}px)`
            }
        })
        this.next.addEventListener('click', () => this.clickBtn(this.next))
        this.prev.addEventListener('click', () => this.clickBtn(this.prev))

        if (this.autoplay) {
            let interval = setInterval(() => {
                this.clickBtn(this.next)
            }, this.timeInterval);
        }

    }
    clickBtn(btn) {
        btn.disabled = true
        setTimeout(() => {
            btn.disabled = false
        }, this.speed);
        const nextOrPrev = btn == this.next ? this.moveSize * -1 : this.moveSize
        this.sliderItem.forEach((el, i) => {
            el.style.transition = '0s'
            if (i != this.activeSlide) {
                el.style.transform = `translateY(${nextOrPrev * -1}px)`
            }
        })
        this.sliderItem[this.activeSlide].style.transform = `translateY(${nextOrPrev}px)`
        this.sliderItem[this.activeSlide].style.transition = `${this.speed}ms`
        if (btn == this.next) {
            this.activeSlide++
            if (this.activeSlide >= this.sliderItem.length) {
                this.activeSlide = 0
            }
        } else if (btn == this.prev) {
            this.activeSlide--
            if (this.activeSlide < 0) {
                this.activeSlide = this.sliderItem.length - 1
            }
        }
        this.sliderItem[this.activeSlide].style.transform = `translateY(0px)`
        this.sliderItem[this.activeSlide].style.transition = `${this.speed}ms`
    }
}







const slider = new SLIDER({
    el: '.slider',
    speed: 1000,
    autoplay: true,
})