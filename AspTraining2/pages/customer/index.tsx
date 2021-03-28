import { Layout } from "../shared/Layout";
import React from "react";
import { CustomerClient, CustomerListItem } from "../../api/shop-api";
import Link from "next/link";
import Swal, { SweetAlertResult } from "sweetalert2";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faPlus, faTimes } from '@fortawesome/free-solid-svg-icons';

const DeleteCustomerButton: React.FunctionComponent<{
    customerID: string,
    name: string | undefined,
    onDeleted?: () => void
}> = (props) => {

    const onClick = async () => {
        const confirm = await Swal.fire<SweetAlertResult>({
            title: 'Confirm delete?',
            text: `Delete customer ${props.name}? This action cannot be undone.`,
            icon: 'warning',
            confirmButtonColor: '#dc3545',
            showCancelButton: true,
            confirmButtonText: 'Delete'
        });

        if (confirm.isConfirmed === false) {
            return;
        }

        const client = new CustomerClient('http://localhost:58778');
        await client.delete(props.customerID);

        Swal.fire({
            toast: true,
            timerProgressBar: true,
            timer: 5000,
            showConfirmButton: false,
            position: 'bottom-right',
            icon: 'success',
            title: 'Successfully deleted customer: ' + props.name
        });

        if (props.onDeleted) {
            props.onDeleted();
        }
    };

    return (
        <button type="button" onClick={onClick} className="btn btn-danger btn-sm">
            <FontAwesomeIcon icon={faTimes}></FontAwesomeIcon>
        </button>
    );
};

const CustomerListItemRows: React.FunctionComponent<{
    customers: CustomerListItem[],
    onChanged?: () => void
}> = (props) => {
    const rows = props.customers.map(Q =>
        <tr key={Q.customerID}>
            <td>{Q.customerID}</td>
            <td>{Q.name}</td>
            <td>{Q.email}</td>
            <td>
                <Link href={'/customer/edit/'+ Q.customerID}>
                    <a className="btn btn-warning btn-sm me-1">
                        <FontAwesomeIcon icon={faEdit}></FontAwesomeIcon>
                    </a>
                </Link>
                <DeleteCustomerButton customerID={Q.customerID} name={Q.name} onDeleted={props.onChanged}></DeleteCustomerButton>
            </td>
        </tr>
    );

    return <tbody>{rows}</tbody>;
}

class Customer extends React.Component<{}, {
    customers: CustomerListItem[]
}> {
    constructor(props) {
        super(props);
        this.state = {
            customers: []
        };
    }

    async componentDidMount() {
        await this.reloadCustomerData();
    }

    reloadCustomerData = async () => {
        const client = new CustomerClient('http://localhost:58778');
        const data = await client.getAll();
        this.setState({
            customers: data
        });
    }

    render() {
        return (
            <div>
                <h1>Manage Customer</h1>
                <p>
                    <Link href="/customer/create">
                        <a className="btn btn-primary">
                            <span className="me-2">
                                <FontAwesomeIcon icon={faPlus}></FontAwesomeIcon>
                            </span>
                            Add New Customers
                        </a>
                    </Link>
                </p>
                <table className="table table-hover table-striped">
                    <thead className="bg-dark text-light">
                        <tr>
                            <th>Customer ID</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th></th>
                        </tr>
                    </thead>
                    <CustomerListItemRows customers={this.state.customers} onChanged={this.reloadCustomerData}>
                    </CustomerListItemRows>
                </table>
            </div>
        );
    }
}

export default function CustomerPage() {
    return (
        <Layout title="Customer">
            <Customer></Customer>
        </Layout>
    );
}
