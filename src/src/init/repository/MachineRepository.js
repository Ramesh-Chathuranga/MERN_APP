import Repository from "./Repository";


class MachineRepository extends Repository {
    getAllMachine = async () => {
        return await this.getData(`/getAllMachine`, {})
    };

    getMachineById = async (id) => {
        return await this.getData(`/getMachine?id=${id}`, {})
    };

    saveMachineData = async (params) => {
        const data = await this.saveForm('/saveMachine', params);
        return data;
    };

    updateMachineData = async (params, id) => {
        const data = await this.updateForm(`/updateMachine?id=${id}`, params);
        return data;
    };

    deleteMachineData = async (id) => {
       return await this.deleteData(`/deleteMachine?id=${id}`,{});
    }
};

export default new MachineRepository();