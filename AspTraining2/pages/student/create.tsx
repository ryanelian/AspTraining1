import { useEffect, useState } from "react";
import { FakultasClient, JurusanClient, Kampus, KampusClient } from "../../api/shop-api";
import { Layout } from "../shared/Layout";
import Select from 'react-select'
import { SingleDatePicker } from 'react-dates';
import Moment from 'moment';
import 'react-dates/initialize';

interface Student {
    studentID: string;
    name: string;
    jurusan: string;
    fakultas: string;
    kampus: string;
    birthday: string;
}

interface SelectOption {
    value: string;
    label: string;
}

function StudentCreateForm() {

    const [listKampus, setListKampus] = useState<Kampus[]>([]);
    const [listFakultas, setListFakultas] = useState<SelectOption[]>([]);
    const [listJurusans, setListJurusans] = useState<SelectOption[]>([]);
    const [birthday, setBirthday] = useState<Moment.Moment | null>(Moment());
    const [birthdayFocused, setBirthdayFocused] = useState(false);

    useEffect(() => {
        (async () => {
            const client = new KampusClient('http://localhost:58778');
            const data = await client.get();
            setListKampus(data);
        })();
        (async () => {
            const client = new FakultasClient('http://localhost:58778');
            const data = await client.get();
            const options = data.map(Q => ({
                label: Q.name ?? '',
                value: Q.fakultasID
            } as SelectOption));

            setListFakultas(options);
        })();
    }, []);

    const downloadJurusan = async (fakultasID: string | undefined) => {
        if (!fakultasID) {
            return;
        }

        const client = new JurusanClient('http://localhost:58778');
        const data = await client.get(fakultasID);
        const options = data.map(Q => ({
            label: Q.name ?? '',
            value: Q.jurusanID
        } as SelectOption));

        setListJurusans(options);
    }

    return (
        <div>
            <form>
                <div className="form-floating mb-3">
                    <input id="studentID" className="form-control" placeholder="1701329295"></input>
                    <label htmlFor="studentID">ID</label>
                </div>
                <div className="form-floating mb-3">
                    <input id="name" className="form-control" placeholder="Ryan Elian"></input>
                    <label htmlFor="name">Name</label>
                </div>
                <div className="mb-3">
                    <label className="fw-bold" htmlFor="fakultas">Fakultas</label>
                    <Select options={listFakultas} onChange={e => downloadJurusan(e?.value)}></Select>
                </div>
                <div className="mb-3">
                    <label className="fw-bold" htmlFor="jurusan">Jurusan</label>
                    <Select options={listJurusans}></Select>
                </div>
                <div className="form-floating mb-3">
                    <select id="kampus" className="form-control" placeholder="BINUS Alam Sutera">
                        {listKampus.map(Q => <option key={Q.kampusID} value={Q.kampusID}>{Q.name}</option>)}
                    </select>
                    <label htmlFor="kampus">Kampus</label>
                </div>
                <div>
                    <label className="fw-bold" htmlFor="birthday">Birthday</label>
                    <SingleDatePicker id="birthday" date={birthday} onDateChange={e => setBirthday(e)}
                        focused={birthdayFocused} onFocusChange={e => setBirthdayFocused(e.focused)} block>
                    </SingleDatePicker>
                </div>
            </form>
        </div>
    );
}

function StudentCreate() {
    return (
        <div>
            <h1 className="mb-4">Add New Student</h1>
            <StudentCreateForm></StudentCreateForm>
        </div>
    );
}

export default function StudentCreatePage() {
    return (
        <Layout title="Add New Student">
            <StudentCreate></StudentCreate>
        </Layout>
    );
}