import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Link from "next/link";
import React, { useState } from "react";
import Swal from "sweetalert2";
import { CustomerCreateEditForm, CustomerFormValues } from "../../forms/CustomerCreateEditForm";
import { CustomerClientWithAuth } from "../../services/NSwagWithAuthFactory";
import { UserManagerFactory } from "../../services/UserManagerFactory";
import { Layout } from "../shared/Layout";

const CreateCustomer: React.FunctionComponent = () => {
    const [values, setValues] = useState<CustomerFormValues>({
        name: '',
        email: ''
    });

    const onSubmit = async (data: CustomerFormValues) => {
        try {
            const userManager = UserManagerFactory();
            const user = await userManager.getUser();
            if (!user) {
                throw new Error('Unauthorized!');
            }

            const client = CustomerClientWithAuth(user);
            await client.create({
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

