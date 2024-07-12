import { getAddress } from "api/Address";
import { IAddressPayload } from "interface/IAddress";
import { IAddress } from "model/Address";
import React, { useEffect, useState } from "react";
import { Sheet, Button, Page, Text, useNavigate } from "zmp-ui";

const AddRessPage: React.FunctionComponent = () => {
    const [list, setList] = useState<IAddress[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchAddresses = async () => {
            try {
                const listAddress = await getAddress();
                setList(listAddress.data);
            } catch (error) {
                setError('Error fetching data');
            } finally {
                setLoading(false);
            }
        };

        fetchAddresses();
    }, []);

    if (loading) {
        return <div>Loading...</div>;
    }

    if (error) {
        return <div>{error}</div>;
    }

    return (
        <Page className="page">
            <div className="flex flex-col justify-center items-center ">
                <h1 className="h-8 md:text-2xl justify-center text-red-400 font-bold md:block">Các Huyện/Thành Phố của tỉnh Quảng Ngãi</h1>
                <div className="w-full max-w-md">
                    <select className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        {list.map((huyen) => (
                            <option key={huyen.IDHuyen} value={huyen.IDHuyen} className="text-gray-700">
                                {huyen.TenHuyen}
                            </option>
                        ))}
                    </select>
                </div>
            </div>
        </Page>
    );
}

export default AddRessPage;
