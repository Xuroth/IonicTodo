import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Storage } from '@ionic/storage';

@Component({
    selector: '',
    templateUrl: 'newtask.html'
})
export class NewTaskPage {
    task: any;
    tasks: any;

    constructor(public navCtrl: NavController, private storage: Storage) {
        this.task = {
            id: 0,
            name: '',
            status: 0,
            createdBy: 0,
            createdOn: new Date(),
            details: ''
        };
    }

    saveTask(task) {
        //perform validation on task
        //Savetask
        let tasks;
        this.storage.get('tasks').then((db) => {
            if (db == null) return;
            console.log('NEWTASK.ts - db:', db);
            this.tasks = db;
            let id = this.tasks.length;
            this.task.id = id;
            this.tasks.push(task);
            console.log('Adding tasks to array in storage',this.tasks)
            this.storage.set('tasks', this.tasks).then(() => this.navCtrl.pop())
        });
        
        // this.storage.set('tasks', this.tasks).then(() => this.navCtrl.pop());

    }
}