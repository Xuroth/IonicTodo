import { Injectable } from '@angular/core';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

@Injectable()
export class DbService {
    db: any;
    config: any;

    constructor(private sqlite: SQLite) {
        this.config = {
            name: 'data.db',
            location: 'default'
        };
        //Check if db exists or create if false
        console.log(this.config);
        this.sqlite.create(this.config).then((db: SQLiteObject) => {
            db.executeSql('create table test(id NUMBER)', {})
            .then(() => db.executeSql('drop table test', {})
                .then(() => console.log('Database Exists'))
                .catch(e => console.log('There was a problem deleting the db',e))
            )
            .catch(e => console.log('There was a problem initializing the database', e));
        })
        .catch(e => console.log('There was a problem setting the SQLiteObject', e));
    }

}