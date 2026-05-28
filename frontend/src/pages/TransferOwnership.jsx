import {useEffect,useState } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const TransferOwnership = () => {

  const [id, setId] = useState("");
  const [newOwner, setNewOwner] = useState("");
  const [loading, setLoading] = useState(false);
const [wallet, setWallet] = useState("");
useEffect(() => {

  const savedWallet =
    localStorage.getItem("walletAddress");

  if (savedWallet) {

    setWallet(savedWallet);
  }

}, []);
  const handleTransfer = async (e) => {

    e.preventDefault();

    try {

      setLoading(true);

      const response = await axios.post(
        "http://localhost:8000/api/transferOwnership",
        {
          id,
          newOwner
        }
      );

      toast.success(response.data.message);

      setId("");
      setNewOwner("");

    } catch (error) {

      console.log(error);

      toast.error(
        error.response?.data?.error ||
        "Transfer failed ❌"
      );

    } finally {

      setLoading(false);
    }
  };

  return (

    <div className="min-h-screen bg-gray-950 text-white p-6">

      <div className="max-w-xl mx-auto bg-gray-900 p-8 rounded-2xl shadow-lg">

        <h1 className="text-3xl font-bold mb-6 text-center">
          Transfer Ownership
        </h1>
{
  wallet && (

    <div
      className="
        mb-6
        p-3
        rounded-xl
        bg-cyan-500/10
        border
        border-cyan-400/20
        text-sm
        break-all
      "
    >

      Connected Wallet: {wallet}

    </div>
  )
}
        <form
          onSubmit={handleTransfer}
          className="space-y-5"
        >

          <div>
            <label className="block mb-2 text-sm">
              Medicine ID
            </label>

            <input
              type="text"
              placeholder="Enter Medicine ID"
              value={id}
              onChange={(e) => setId(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-sm">
              New Owner Wallet Address
            </label>

            <input
              type="text"
              placeholder="Enter Wallet Address"
              value={newOwner}
              onChange={(e) => setNewOwner(e.target.value)}
              className="w-full p-3 rounded-lg bg-gray-800 border border-gray-700 outline-none"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 hover:bg-blue-700 transition-all p-3 rounded-lg font-semibold"
          >

            {
              loading
                ? "Transferring..."
                : "Transfer Ownership"
            }

          </button>

        </form>

      </div>

    </div>
  );
};

export default TransferOwnership;