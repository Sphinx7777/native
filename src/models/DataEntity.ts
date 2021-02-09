import action from '../decoradors/action';
import Entity from './entity';
import { call, cancelled } from 'redux-saga/effects';
import { ENTITY } from '../constants';

class DataEntity extends Entity {

    constructor() {
        super(ENTITY.SIGNAL_DATA);
    }

    @action()
    public * getData() {

        const response = yield call(this.xRead, 'http://neologic.golden-team.org/api/page/url/services');
    }

}

export default new DataEntity();