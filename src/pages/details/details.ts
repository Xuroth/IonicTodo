import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';
import { AlertController } from 'ionic-angular';

@Component({
    selector: '',
    templateUrl: 'details.html'
})


export class DetailsPage {

    task: any;
    taskBackup: any;
    isEditing: any;
    constructor(public navCtrl: NavController, public params: NavParams, private storage: Storage, public alertCtrl: AlertController) {
        this.task = params.get('task');
        this.taskBackup = this.task;
        this.isEditing = false;
    }
    enterEdit(){
        this.isEditing = true;
    }

    changeStatus(status){
        switch(status){
            case 'complete':
                status = 1;
                break;
            case 'overdue':
                status = 2;
                break;
            case 'cancelled':
                status = -1;
                break;
            case 'pending':
                status = 0;
                break;
            default:
                status = 0;
                break;
        }
        console.log('Task marked as status code: ', status);
        //Change status of task
        this.storage.get('tasks').then((db) => {
            for (let i = 0; i<db.length; i++) {
                if(db[i].id == this.task.id) {
                    db[i].status = status;
                    console.log('db.task.status: ', db[i].status);
                    this.task = db[i];
                }
            }

            this.storage.set('tasks', db);
        })

        //Save
        //Return to task list
    }

    saveTask() {
        this.storage.get('tasks').then( (db) => {
            for(let i = 0; i<db.length; i++) {
                if(db[i].id == this.task.id) {
                    db[i] = this.task;
                    console.log('Updated Task #' + this.task.id);
                }
            }
            this.storage.set('tasks', db);
            this.isEditing = false;
        })
    }

    cancelEdit() {
        this.storage.get('tasks').then( (db) => {
            for(let i = 0; i<db.length; i++) {
                if(db[i].id == this.task.id) {
                    this.task = db[i];
                }
            }
        })
        this.isEditing = false;
    }

    deleteConfirm() {
        let confirm = this.alertCtrl.create({
            title: 'Delete this task?',
            buttons: [
                {
                    text: 'cancel',
                    handler: () => {

                    }
                },
                {
                    text: 'Yes',
                    handler: () => {
                        this.deleteTask();
                    }
                }
            ]
        });
        confirm.present();
    }

    deleteTask() {
        console.log('Deleting Task!');
        //find task position in array
        //arr.splice(x,1)
        this.storage.get('tasks').then( (db) => {
            for(let i = 0; i<db.length; i++) {
                if(db[i].id == this.task.id) {
                    let pos = i;
                    console.log('Position of task is ' + pos);
                    db.splice(pos,1);
                    this.storage.set('tasks', db);
                    this.navCtrl.pop();
                }
            }
        })
    }
}