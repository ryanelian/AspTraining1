import { faArrowLeft, faChevronUp, faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { CustomerClient } from "../../api/shop-api";
import { CustomerCreateEditForm, CustomerFormValues } from "../../forms/CustomerCreateEditForm";
import { Layout } from "../shared/Layout";

const CreateCustomer: React.FunctionComponent = () => {
    const [values, setValues] = useState<CustomerFormValues>({
        name: '',
        email: ''
    });

    const onSubmit = async (data: CustomerFormValues) => {
        try {
            const client = new CustomerClient('http://localhost:58778');
            await client.post({
                name: data.name,
                email: data.email
            });

            Swal.fire({
                title: 'Submit Successful',
                text: 'Created new customer: ' + data.name,
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

        setValues({
            name: '',
            email: ''
        });
    }

    return (
        <div>
            <h1>Create Customer</h1>
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

export default function CreateCustomerPage() {
    return <Layout title="Create Customer">
        <CreateCustomer></CreateCustomer>
    </Layout>;
}

