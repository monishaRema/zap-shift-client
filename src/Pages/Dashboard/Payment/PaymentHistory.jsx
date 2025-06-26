import React from 'react';
import useAuth from '../../../Hooks/useAuth';
import useAxiosSecure from '../../../hooks/useAxiosSecure';
import { useQuery } from '@tanstack/react-query';

const PaymentHistory = () => {
    const {user} = useAuth();
    const axiosSecure = useAxiosSecure();
    const {isPanding, data: payments =[]} = useQuery({
        queryKey:['payments',user.email],
        queryFn: async()=>{
            const res = await axiosSecure.get(`/payments?email=${user.email}`)
            return res.data
        }
    })


    if(isPanding){
        return '...loading'
    }
    console.log(payments)
    return (
    <div className="overflow-x-auto my-10">
      <table className="min-w-full bg-white rounded-xl shadow">
        <thead className="bg-gray-100">
          <tr>
            <th className="py-2 px-4">#</th>
            <th className="py-2 px-4">Transaction ID</th>
            <th className="py-2 px-4">Amount (USD)</th>
       
            <th className="py-2 px-4">Parcel ID</th>
            <th className="py-2 px-4">Payment Method</th>
            <th className="py-2 px-4">Date</th>
          </tr>
        </thead>
        <tbody>
          {payments && payments.length > 0 ? (
            payments.map((payment, i) => (
              <tr key={payment._id} className="">
                <td className="py-2 px-4">{i + 1}</td>
                <td className="py-2 px-4">{payment.transactionId}</td>
                <td className="py-2 px-4">${payment.amount}</td>
  
                <td className="py-2 px-4">{payment.parcelId}</td>
                <td className="py-2 px-4">
                  {payment.paymentMethod && payment.paymentMethod.join(", ")}
                </td>
                <td className="py-2 px-4">
                  {new Date(payment.createdAt).toLocaleString()}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="py-4 text-center text-gray-400">
                No payment history found.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default PaymentHistory;