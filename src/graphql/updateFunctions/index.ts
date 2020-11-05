import { MutationUpdaterFn } from '@apollo/client';
import postCreate from './postCreate';

interface IUpdateFunctionsMap {
    [key: string]: MutationUpdaterFn<any>;
}

const updateFunctions: IUpdateFunctionsMap = {
    postCreate,
};

export default updateFunctions;