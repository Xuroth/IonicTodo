import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DetailsPage } from '../details/details';
import { NewTaskPage } from '../newtask/newtask';
// import { DbService } from '../../app/services/db.service';
import { Storage } from '@ionic/storage';

@Component({
    selector: 'tasks',
    templateUrl: 'tasks.html'
})
export class TasksPage {
    tasks: any;
    filter: any;
    constructor(public navCtrl: NavController, private storage: Storage){
        this.storage.get('tasks').then( (tasks) => {
            if (tasks == null) {
                console.log('No tasks yet. Get default', tasks);
                this.getDefault();
            }
        })
    }

    getDefault(){
        this.tasks = [
            {
                id: 0,
                name: 'TestTask',
                status: 0, //0:pending,1:complete,2:overdue,-1:cancelled
                createdBy: 0,
                createdOn: new Date(),
                details: 'This is a test task. It has simple information to view and edit.'
            }
        ];
        this.filter = null;

        this.storage.set('tasks', this.tasks);
        console.log('Created Default Task');
    }

    ngOnInit() {
        // this.storage.get('tasks').then( (tasks) => {
        //     this.tasks = tasks;
        // });
        this.getTasks();
    }
    ionViewWillEnter() {
        this.getTasks();
    }
    getTasks(){
        this.storage.get('tasks').then((tasks) => {
            this.tasks = tasks;
            console.log('TASKS.ts - tasks:', this.tasks);
        });
    
    }

    viewTask(task) {
        this.navCtrl.push(DetailsPage, {task: task});
    }

    newTask() {
        this.navCtrl.push(NewTaskPage);
    }

    changeFilter() {
        console.log('Filter is set to :' + this.filter);
        if (this.filter == null || this.filter == 'null') {

            this.storage.get('tasks').then( (db) => {
                this.tasks = db;
            });
            
        } else {
            let dbTasks;
            this.storage.get('tasks').then( (db) => {
                dbTasks = db.filter((el) => {
                    return el.status == this.filter;
                    
                });
                this.tasks = dbTasks;
            });
            
        }
    }
}