import axios from 'axios'

export const initializePaystackTransaction = async (
  amount: number,
  email: string,
) => {
  try {
    const { data } = await axios({
      method: 'post',
      url: 'https://api.paystack.co/transaction/initialize',
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        'Content-Type': 'application/json',
      },
      data: {
        amount,
        email,
      },
    })
    return data
  } catch (error) {
    console.log(error)
  }
}

/**
 * verify transaction
 */
export const verifyPayment = async (refference: string) => {
  try {
    const { data } = await axios({
      method: 'get',
      url: `https://api.paystack.co/transaction/verify/${refference}`,
      headers: {
        Authorization: `Bearer ${process.env.PAYSTACK_SECRET}`,
        'Content-Type': 'application/json',
      },
    })

    if (!data.status) {
      return
    }
    return data
  } catch (error) {
    console.log(error)
  }
}
