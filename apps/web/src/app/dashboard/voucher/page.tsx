'use client'

import { getVouchersByIdThunk } from '@/lib/features/user/userSlice'
import { useAppDispatch, useAppSelector } from '@/lib/hook'
import { showFormattedDateShort } from '@/utils'
import { Card, CardBody, CardHeader, Divider, Input } from '@nextui-org/react'
import { useEffect } from 'react'

const Voucher = () => {
  const { value } = useAppSelector((state) => state.auth)
  const { vouchers, isLoading } = useAppSelector((state) => state.user)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getVouchersByIdThunk())
  },[])
  return (
    <div className='container md:min-h-[calc(100vh-66px)] min-h-[calc(100vh-60px)] mx-auto px-4 py-10 flex justify-center items-start relative z-0'>
      <div className='max-w-80 mx-auto'>
        {value.session && (
          <>
            <h4 className='font-semibold mb-3'>Your Referral</h4>
            <Input
              isReadOnly
              type="text"
              defaultValue={`${value.session.referral}`}
              labelPlacement="outside"
            />
          </>
        )}
        <Divider className="my-6"/>
        <h4 className='font-semibold mb-3'>Your Vouhcers</h4>
        {isLoading ? (
          <></>
        ) : (
          <>
            {vouchers.length !== 0 ? (
              <>
                {vouchers.map((vc) => (
                  <Card className="max-w-[400px]" key={vc.id}>
                    <CardHeader className="flex gap-3">
                      <p className="text-md">{vc.name}</p>
                    </CardHeader>
                    <Divider/>
                    <CardBody>
                      <div className='flex justify-between text-sm'>
                        <div>
                          <p>Exp.</p>
                          <p>{showFormattedDateShort(vc.expAt)}</p>
                        </div>
                        <div>
                          {vc.type == 'point' ? (
                            <>
                              <p>Points</p>
                              <p>{vc.points}</p>
                            </>
                          ) : (
                            <>
                              <p>Discount</p>
                              <p>{vc.discount} %</p>
                            </>
                          )}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                ))}
              </>
            ) : (
              <p className='text-sm'>There are no vouchers yet</p>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default Voucher
