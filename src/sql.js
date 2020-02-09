import { INIT_DATA, CREATE_TABLE } from './helpers';
import { sequelize } from './user';

sequelize
    .query(CREATE_TABLE)
        .then(res => {
            console.log('OK: ', res);
            
            sequelize
                .query(INIT_DATA)
                    .then(res => {
                        console.log(res)
                    })
                    .catch(e => {
                        console.error(e.stack)
                    });
        })
        .catch(e => {
            console.error(e.stack)
        });




    