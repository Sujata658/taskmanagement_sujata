import { useState } from "react";
import { Button } from "@/components/ui/button";
import { InputOTP, InputOTPGroup, InputOTPSeparator, InputOTPSlot } from "@/components/ui/input-otp";
import { useNavigate, useParams } from "react-router-dom";

type OTPProps = {
  otp: string;
  email: string;
};

const OTP: React.FC = () => {
  const { otp } = useParams<OTPProps>();
  const navigate = useNavigate();
  const [isVerified, setIsVerified] = useState(false);

  const otpArray = otp ? otp.split('') : [];

  const handleClick = () => {
    setIsVerified(true);
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="p-12 rounded-lg max-w-[400px] shadow-lg bg-white">
        {isVerified ? (
          <div className="text-center">
            <img src="/path-to-thank-you-image.svg" alt="Thank You" className="w-32 mx-auto mb-4" />
            <h2 className="text-3xl font-bold text-green-600">Thank You!</h2>
            <p className="mt-4 text-lg text-gray-700">Your email has been verified.</p>
            <p className="text-lg text-gray-700">You can now <span className="font-bold text-black">login</span> to proceed.</p>
            <Button className="w-full mt-4" onClick={() => navigate('/login')}>Login</Button>
          </div>
        ) : (
          <>
            <h2 className="text-3xl text-center font-bold">Enter OTP</h2>
            <p className="m-4 text-center">Please enter the 6-digit OTP sent to your email.</p>

            {otp && (
              <InputOTP maxLength={6}>
                <InputOTPGroup>
                  {otpArray.slice(0, 3).map((value, index) => (
                    <InputOTPSlot key={index} index={index} defaultValue={value} />
                  ))}
                </InputOTPGroup>
                <InputOTPSeparator />
                <InputOTPGroup>
                  {otpArray.slice(3, 6).map((value, index) => (
                    <InputOTPSlot key={index + 3} index={index + 3} defaultValue={value} />
                  ))}
                </InputOTPGroup>
              </InputOTP>
            )}

            <Button className="w-full mt-4" onClick={handleClick}>Verify OTP</Button>
            {/* <a href="#" className="text-center block mt-4">Resend OTP</a> */}
          </>
        )}
      </div>
    </div>
  );
};

export default OTP;
