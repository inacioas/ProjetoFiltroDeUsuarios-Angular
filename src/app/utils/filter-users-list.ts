import { isWithinInterval } from "date-fns";
import { IUser } from "../interfaces/user/user.interface";
import { IFilterOptions } from "../interfaces/filter-options.interface";

const filtredUsersListByName = (name: string | undefined, usersList: IUser[]): IUser[] => {
    const NAME_NOT_TYPED = name === undefined;

    if (NAME_NOT_TYPED) {
        return usersList;
    }

    const filtredList = usersList.filter((user) => user.nome.toLowerCase().includes(name.toLowerCase()));

    return filtredList;
}

const filtredUsersListBystatus = (status: boolean | undefined, usersList: IUser[]): IUser[] => {
    const STATUS_NOT_SELECTED = status === undefined;

    if (STATUS_NOT_SELECTED) {
        return usersList;
    }

    const filtredList = usersList.filter((user) => user.ativo === status);

    return filtredList;
}

const filterUsersListByDate = (startDate: Date | undefined, endDate: Date | undefined, usersList: IUser[]): IUser[] => {
    const DATES_NOT_SELECTED = startDate === undefined || endDate === undefined;

    if (DATES_NOT_SELECTED) {
        return usersList;
    }

    const checkDateInterval = (user: IUser) => isWithinInterval(new Date(user.dataCadastro), {
        start: startDate,
        end: endDate,
    });

    const listFitred = usersList.filter(checkDateInterval);

    return listFitred;
}

const filterUsersList = (filterOptions: IFilterOptions, usersList: IUser[]): IUser[] => {
    let filtredList: IUser[] = [];

    filtredList = filtredUsersListByName(filterOptions.name, usersList);

    filtredList = filtredUsersListBystatus(filterOptions.status, filtredList);

    filtredList = filterUsersListByDate(filterOptions.startDate, filterOptions.endDate, filtredList);

    return filtredList;
}

export { filterUsersList };