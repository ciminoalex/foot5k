import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, AlertController } from 'ionic-angular';
import { Validators, FormGroup, FormControl } from '@angular/forms';

/**
 * Generated class for the MatchEditPage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@IonicPage()
@Component({
  selector: 'page-match-edit',
  templateUrl: 'match-edit.html',
})
export class MatchEditPage {

  event_form: FormGroup;
  categories_checkbox_open: boolean;
  categories_checkbox_result;
  
  
  constructor(public navCtrl: NavController, public navParams: NavParams, public alertCtrl: AlertController) {
    this.event_form = new FormGroup({
      title: new FormControl('', Validators.required),
      location: new FormControl('', Validators.required),
      date: new FormControl('2016-09-18', Validators.required),
      from_time: new FormControl('13:00', Validators.required),
      to_time: new FormControl('', Validators.required),
      players: new FormControl(10, Validators.required)
    });
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad MatchEditPage');
  }

  createEvent(){
    console.log(this.event_form.value);
  }

  chooseCategory(){
    let alert = this.alertCtrl.create({
      cssClass: 'category-prompt'
    });
    alert.setTitle('Category');

    alert.addInput({
      type: 'checkbox',
      label: 'Alderaan',
      value: 'value1',
      checked: true
    });

    alert.addInput({
      type: 'checkbox',
      label: 'Bespin',
      value: 'value2'
    });

    alert.addButton('Cancel');
    alert.addButton({
      text: 'Confirm',
      handler: data => {
        console.log('Checkbox data:', data);
        this.categories_checkbox_open = false;
        this.categories_checkbox_result = data;
      }
    });
    alert.present().then(() => {
      this.categories_checkbox_open = true;
    });
  }


}
