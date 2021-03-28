import { GetServerSideProps } from 'next';
import React, { useState } from 'react';
import { CustomerCreateEditForm, CustomerFormValues } from '../../../forms/CustomerCreateEditForm';
import { Layout } from '../../shared/Layout';

interface EditProps {
    id: string;
}

const Edit: React.FunctionComponent<EditProps> = (props) => {
    const [values, setValues] = useState<CustomerFormValues>({
        name: '',
        email: ''
    });

    const onSubmit = async () => {
        await new Promise(ok => setTimeout(ok, 5000));
     };

    return (
        <div>
            <CustomerCreateEditForm values={values} onChange={newValues => setValues({ ...newValues })}
                onValidSubmit={onSubmit}>
            </CustomerCreateEditForm>
            {JSON.stringify(values)}
        </div>
    );
}

const EditPage: React.FunctionComponent<EditProps> = (props) => {
    return (
        <Layout title="Edit Customer">
            <Edit id={props.id}></Edit>
        </Layout>
    );
}

export default EditPage;

export const getServerSideProps: GetServerSideProps<EditProps> = async (context) => {
    if (context.params) {
        const id = context.params['id'];
        if (typeof id === 'string') {
            return {
                props: {
                    id: id
                }
            }
        }
    }

    throw new Error('Invalid route parameter "id".');
}
