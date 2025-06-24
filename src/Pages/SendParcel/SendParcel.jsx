import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import toast, { Toaster } from "react-hot-toast";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    watch,
    reset,
    control,
    formState: { errors },
  } = useForm();

  const [pendingParcel, setPendingParcel] = useState(null);

  const watchType = watch("type");

  // Mock cost calculation
  const calculateCost = (data) => {
    let base = data.type === "document" ? 50 : 100;
    if (data.weight) base += parseFloat(data.weight) * 10;
    if (data.receiverServiceCenter !== data.senderServiceCenter) base += 50;
    return base;
  };

  const onSubmit = (data) => {
    const cost = calculateCost(data);
    setPendingParcel({ ...data, cost });
    toast(
      (t) => (
        <div>
          <p>
            💰 Estimated Delivery Cost: <strong>৳{cost}</strong>
          </p>
          <button
            onClick={() => {
              handleConfirm(data, cost);
              toast.dismiss(t.id);
            }}
            className="btn btn-sm btn-primary mt-2"
          >
            Confirm & Submit
          </button>
        </div>
      ),
      { duration: 10000 }
    );
  };

  const handleConfirm = (data, cost) => {
    const parcel = {
      ...data,
      cost,
      creation_date: new Date().toISOString(),
    };
    console.log("Saving to DB:", parcel); // Replace this with API call
    toast.success("Parcel added successfully!");
    reset();
    setPendingParcel(null);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Toaster />
      <h2 className="text-2xl font-bold mb-2">Add Parcel</h2>
      <p className="text-gray-600 mb-6">Fill in the following details to schedule a pickup and delivery.</p>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Parcel Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">📦 Parcel Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="label">Parcel Type *</label>
              <select {...register("type", { required: true })} className="select select-bordered w-full">
                <option value="">Select</option>
                <option value="document">Document</option>
                <option value="non-document">Non-Document</option>
              </select>
              {errors.type && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div>
              <label className="label">Title *</label>
              <input type="text" {...register("title", { required: true })} className="input input-bordered w-full" />
              {errors.title && <span className="text-red-500 text-sm">Required</span>}
            </div>
            {watchType === "non-document" && (
              <div>
                <label className="label">Weight (kg)</label>
                <input type="number" step="0.1" {...register("weight")} className="input input-bordered w-full" />
              </div>
            )}
          </div>
        </div>

        {/* Sender Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">📨 Sender Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Sender Name *</label>
              <input
                type="text"
                defaultValue="John Doe"
                {...register("senderName", { required: true })}
                className="input input-bordered w-full"
              />
              {errors.senderName && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div>
              <label className="label">Sender Contact *</label>
              <input type="text" {...register("senderContact", { required: true })} className="input input-bordered w-full" />
              {errors.senderContact && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div>
              <label className="label">Sender Region *</label>
              <input type="text" {...register("senderRegion", { required: true })} className="input input-bordered w-full" />
              {errors.senderRegion && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div>
              <label className="label">Sender Service Center *</label>
              <input type="text" {...register("senderServiceCenter", { required: true })} className="input input-bordered w-full" />
              {errors.senderServiceCenter && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div>
              <label className="label">Sender Address *</label>
              <textarea {...register("senderAddress", { required: true })} className="textarea textarea-bordered w-full"></textarea>
              {errors.senderAddress && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div>
              <label className="label">Pickup Instruction *</label>
              <textarea {...register("pickupInstruction", { required: true })} className="textarea textarea-bordered w-full"></textarea>
              {errors.pickupInstruction && <span className="text-red-500 text-sm">Required</span>}
            </div>
          </div>
        </div>

        {/* Receiver Info */}
        <div>
          <h3 className="text-lg font-semibold mb-2">📥 Receiver Info</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="label">Receiver Name *</label>
              <input type="text" {...register("receiverName", { required: true })} className="input input-bordered w-full" />
              {errors.receiverName && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div>
              <label className="label">Receiver Contact *</label>
              <input type="text" {...register("receiverContact", { required: true })} className="input input-bordered w-full" />
              {errors.receiverContact && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div>
              <label className="label">Receiver Region *</label>
              <input type="text" {...register("receiverRegion", { required: true })} className="input input-bordered w-full" />
              {errors.receiverRegion && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div>
              <label className="label">Receiver Service Center *</label>
              <input type="text" {...register("receiverServiceCenter", { required: true })} className="input input-bordered w-full" />
              {errors.receiverServiceCenter && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div>
              <label className="label">Receiver Address *</label>
              <textarea {...register("receiverAddress", { required: true })} className="textarea textarea-bordered w-full"></textarea>
              {errors.receiverAddress && <span className="text-red-500 text-sm">Required</span>}
            </div>
            <div>
              <label className="label">Delivery Instruction *</label>
              <textarea {...register("deliveryInstruction", { required: true })} className="textarea textarea-bordered w-full"></textarea>
              {errors.deliveryInstruction && <span className="text-red-500 text-sm">Required</span>}
            </div>
          </div>
        </div>

        <button type="submit" className="btn btn-primary w-full mt-6">
          Submit Parcel
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
