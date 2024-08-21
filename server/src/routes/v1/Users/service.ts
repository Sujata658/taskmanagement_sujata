import CustomError from '../../../utils/Error';
import InputValidation from '../../../utils/InputValidation';
// import { User } from './model';
import { getAllUsers, getUserByEmail, getUserById, deleteUser, updateVerified } from './repository';
import { messages } from '../../../utils/Messages';
// import {sendMail} from '../../../config/sendMail';


const UserService = {
  async verifyOtp(email: string, code: string) {
    const record = await UserService.getUserByEmail(email);
    console.log(record)
    if (!record) {
      throw new CustomError(messages.user.not_found, 400);
    }

    if (record.otp !== code) {
      throw new CustomError(messages.auth.invalid_otp, 400);
    }

    const result = await updateVerified(record._id.toString(), true);
    if(!result) throw new CustomError(messages.user.verification_failed, 404);

    const { password, otp, ...user } = result.toObject();
    return user;
  },
  async getUser(id: string) {
    InputValidation.validateid(id)
    const user = await getUserById(id);
    if (!user) {
      throw new CustomError(messages.user.not_found, 404);
    }
    return user;
  },
  async getUserByEmail(email: string) {
    return getUserByEmail(email);
  },

  getUsers() {
    return getAllUsers();
  },
  async deleteUser(id: string) {
    InputValidation.validateid(id);
    const user = await getUserById(id);
    if (!user) {
      throw new CustomError(messages.user.not_found, 404);
    }
    return deleteUser(id);
  },
  // updateUser(id: string, userData: Partial<User>) {
  //   InputValidation.validateid(id);
  //   const updateData: Partial<User> = {};
  //   if (userData.name) {
  //     updateData.name = userData.name;
  //   }

  //   return updateUser(id, updateData);
  // },

  async logout(id: string) {
    InputValidation.validateid(id);
    const user = await getUserById(id);
    if (!user) {
      throw new CustomError(messages.user.not_found, 404);
    }
    return true
  }
};

export default UserService;