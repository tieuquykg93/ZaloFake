import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, LoadingController, ToastController, AlertController } from 'ionic-angular';
import { UserProvider } from '../../providers/user/user';
import {HomePage} from '../home/home'

/**
 * Generated class for the SignupPage page.
 *
 * See https://ionicframework.com/docs/components/#navigation for more info on
 * Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-signup',
  templateUrl: 'signup.html',
})
export class SignupPage {
  newuser: any = {
    email: '',
    password: '',
  }
  constructor(public navCtrl: NavController, public navParams: NavParams, public userservice: UserProvider,
              public loadingCtrl: LoadingController, public toastCtrl: ToastController, public alertCtrl: AlertController) {
  }
 
  signup() {
    var toaster = this.toastCtrl.create({
      duration: 3000,
      position: 'bottom'
    });
    if (this.newuser.email == '' || this.newuser.password == '') {
      toaster.setMessage('Tai khoan khong hop le');
      toaster.present();
    }
    else if (this.newuser.password.length < 5) {
      toaster.setMessage('Mat khau phai nhieu hon 5 ky tu');
      toaster.present();
    }
    else {
      let loader = this.loadingCtrl.create({
        content: 'please wait'
      });
      loader.present();
      this.userservice.adduser(this.newuser).then((res: any) => {
        loader.dismiss();
        if (res.success){
          const alert = this.alertCtrl.create({
            title: 'Đang ky thanh cong',
            subTitle: 'tai khoan cua ban da duoc luu tren he thong',
            buttons: ['OK']
          });
          alert.present();
          this.navCtrl.push(HomePage);
        }else
          alert('Error' + res);
      })
    }
  }  
back(){
  this.navCtrl.setRoot(HomePage);
}
}
