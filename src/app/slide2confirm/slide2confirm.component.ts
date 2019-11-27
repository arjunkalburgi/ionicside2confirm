import { Component, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-slide2confirm',
  templateUrl: './slide2confirm.component.html',
  styleUrls: ['./slide2confirm.component.scss'],
})
export class Slide2confirmComponent implements OnInit {

  @ViewChild('item', {static: false}) item: ElementRef;
  @ViewChild('track', {static: false}) container: ElementRef;
  @ViewChild('before', {static: false}) beforemsg: ElementRef;
  @ViewChild('after', {static: false}) aftermsg: ElementRef;
  @ViewChild('end', {static: false}) endmsg: ElementRef;
  dragWidth: number;
  active: boolean;
  currentX: number = 0;
  initialX: number = 0;
  xOffset: number = 0;
  @Output() public isConfirmed: EventEmitter<any> = new EventEmitter();

  constructor() {
    this.active = false;
    this.xOffset = 0;
  }

  ngOnInit() {
    this.dragWidth = 300; //this.container.nativeElement.clientWidth - this.item.nativeElement.clientWidth - 20;

    // this.container.nativeElement.addEventListener('touchstart', this.dragStart, false);
    // this.container.nativeElement.addEventListener('touchend', this.dragEnd, false);
    // this.container.nativeElement.addEventListener('touchmove', this.drag, false);

    // this.container.nativeElement.addEventListener('mousedown', this.dragStart, false);
    // this.container.nativeElement.addEventListener('mouseup', this.dragEnd, false);
    // this.container.nativeElement.addEventListener('mousemove', this.drag, false);
  }


  dragStart = (e) => {
    if (e.type === 'touchstart') {
      this.initialX = e.touches[0].clientX - this.xOffset;
    } else {
      this.initialX = e.clientX - this.xOffset;
    }

    if (e.target === this.item.nativeElement) {
      this.active = true;
    }
  }

  dragEnd = (e) => {
    if (this.currentX < (this.dragWidth - 5)) {
      this.animateBack();
    } else {
      this.completed();
    }

    this.initialX = this.currentX;
    this.active = false;
  }

  drag = (e) => {
    console.log('drag', e, this.active);
    if (this.active) {

      e.preventDefault();

      if (e.type === 'touchmove') {
        this.currentX = e.touches[0].clientX - this.initialX;
      } else {
        this.currentX = e.clientX - this.initialX;
      }

      console.log(this.currentX, this.currentX > 0 && this.currentX < this.dragWidth)
      if (this.currentX > 0 && this.currentX < this.dragWidth) {
        this.setTranslate(this.currentX);
      }
    }
  }

  setTranslate = (xPos) => {
    this.item.nativeElement.style.transform = 'translate3d(' + xPos + 'px, ' + 0 + 'px, 0)';
    this.endmsg.nativeElement.style.opacity = 0;
    if (xPos > this.dragWidth / 2) {
      this.aftermsg.nativeElement.style.opacity = 1;
      this.beforemsg.nativeElement.style.opacity = 0;
      this.container.nativeElement.style.backgroundColor = 'green';
    } else {
      this.aftermsg.nativeElement.style.opacity = 0;
      this.beforemsg.nativeElement.style.opacity = 1;
      this.container.nativeElement.style.backgroundColor = 'blue';
    }
  }

  animateBack = () => {
    // turn off/on animations to speed up the fallback
    this.item.nativeElement.classList.toggle('animate');
    this.container.nativeElement.classList.toggle('animate');
    this.beforemsg.nativeElement.classList.toggle('animate');
    this.aftermsg.nativeElement.classList.toggle('animate');
    this.setTranslate(0);
    setTimeout(() => {
      // wait for the animation is done before turning animations back on/off
      this.item.nativeElement.classList.toggle('animate');
      this.container.nativeElement.classList.toggle('animate');
      this.beforemsg.nativeElement.classList.toggle('animate');
      this.aftermsg.nativeElement.classList.toggle('animate');
    }, 600);
  }

  completed = () => {
    this.endmsg.nativeElement.style.opacity = 1;
    this.aftermsg.nativeElement.style.opacity = 0;
    this.beforemsg.nativeElement.style.opacity = 0;
    this.isConfirmed.emit('hi');
  }
}
