import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { GetServerSideProps } from 'next';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { CustomerClient } from '../../../api/shop-api';
import { CustomerCreateEditForm, CustomerFormValues } from '../../../forms/CustomerCreateEditForm';
import { Layout } from '../../shared/Layout';
import ErrorPage from 'next/error';
import Swal from 'sweetalert2';

interface EditProps {
    id: string;
}

const Edit: React.FunctionComponent<EditProps> = ({ id }) => {
    const [values, setValues] = useState<CustomerFormValues>({
        name: '',
        email: ''
    });

    const [ready, setReady] = useState(false);
    const [notFound, setNotFound] = useState(false);

    const tarikData = async () => {
        try {
            const client = new CustomerClient('http://localhost:58778');
            const data = await client.get(id);
            setValues({
                name: data.name ?? '',
                email: data.email ?? ''
            });
        } catch (err) {
            setNotFound(true);
        }

        setReady(true);
    };

    // jalanin fungsi tarik data ketika props.id berubah (1x di awal saja)
    useEffect(() => {
        tarikData();
    }, [id]);

    const onSubmit = async (submit: CustomerFormValues) => {
        try {
            const client = new CustomerClient('http://localhost:58778');
            await client.edit(id, {
                name: submit.name,
                email: submit.email
            });

            Swal.fire({
                title: 'Submit Successful',
                text: 'Edited customer data: ' + submit.name,
                icon: 'success'
            });

        } catch (error) {
            // console.error(error);
            Swal.fire({
                title: 'Submit Failed',
                text: 'An error has occurred. Please try again or contact an administrator',
                icon: 'error'
            });
        }
    };

    if (!ready) {
        return <div>Loading...</div>
    }

    if (notFound) {
        return <ErrorPage statusCode={404}></ErrorPage>
    }

    return (
        <div>
            <h1>Edit Customer</h1>
            <p>
                <Link href="/customer">
                    <a>
                        <span className="me-2">
                            <FontAwesomeIcon icon={faArrowLeft}></FontAwesomeIcon>
                        </span>
                        Return to index
                    </a>
                </Link>
            </p>
            <CustomerCreateEditForm values={values} onChange={newValues => setValues({ ...newValues })}
                onValidSubmit={onSubmit}>
            </CustomerCreateEditForm>
        </div>
    );
}

const EditPage: React.FunctionComponent<EditProps> = ({ id }) => {
    if (!id) {
        return <ErrorPage statusCode={404}></ErrorPage>
    }

    return (
        <Layout title="Edit Customer">
            <Edit id={id}></Edit>
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

    return {
        props: {
            id: ''
        }
    };
}
