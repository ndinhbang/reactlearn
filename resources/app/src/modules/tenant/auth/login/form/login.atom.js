import { atom } from "jotai";

const defaultValues = {
    username: '',
    password: '',
}

const formAtom = atom(defaultValues);

export {
    defaultValues,
    formAtom
};
