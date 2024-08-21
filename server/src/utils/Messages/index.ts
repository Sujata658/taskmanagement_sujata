export const messages = {
  user: {
    creation_success: 'User Created Successfully',
    all_get_success: 'Users Fetched Successfully',
    one_get_success: 'User Fetched Successfully',
    not_found: 'User With Given Credentials Not Found',
    email_exist: "Email Already Exist",
    edit_success: 'User Edited Successfully',
    delete_success: 'User Deleted Successfully',
    edit_forbidden: 'Forbidden To Edit User',
    delete_forbidden: 'Forbidden To Delete User',
    my_posts_found: "Found all my posts",
    update_success: "User Updated Successfully",
    user_verified: "User Verified Successfully",
    verification_failed: "User Verification Failed",
    logout_success: "User Logged Out Successfully",
    validation: {
      missing_data: 'Please provide email, name or password in message body',
    },
  },
  task: {
    creation_success: 'Task Created Successfully',
    all_get_success: 'Tasks Fetched Successfully',
    one_get_success: 'Task Fetched Successfully',
    not_found: 'Task Not Found',
    edit_success: 'Task Edited Successfully',
    delete_success: 'Task Deleted Successfully',
    edit_forbidden: 'Forbidden To Edit Task',
    delete_forbidden: 'Forbidden To Delete Task',
    validation: {
      missing_author: 'Please provide author in message body',
      missing_data: "Either description or title is empty"
    },
  },
  comment: {
    creation_success: 'Comment Created Successfully',
    all_get_success: 'Comments Fetched Successfully',
    one_get_success: 'Comment Fetched Successfully',
    not_found: 'Comment With Given Id Not Found',
    edit_success: 'Comment Edited Successfully',
    delete_success: 'Comment Deleted Successfully',
    edit_forbidden: 'Forbidden To Edit Comment',
    delete_forbidden: 'Forbidden To Delete Comment',
    creation_failed: 'Failed to create comment',
    validation: {
      missing_data: 'Data missing',
    },
  },
  auth: {
    login_success: 'LoggedIn Successfully',
    invalid_account: 'Invalid Password or Email',
    invalid_token: 'Invalid Token',
    refresh_token_expired: 'Refresh Token Expired', 
    not_authorized: 'Not Authorized',
    refresh_success: 'Token Refreshed Successfully',
    otp_sent: "OTP has been sent",
    otp_expired: "OTP has expired",
    invalid_otp: "OTP is invalid"
    
  },
  error: {
    internal_server_error: 'Internal Server Error',
    mail_not_enabled_error: "Please allow less secure apps in your google mail account lol"
  },
  validation:{
    invalid_id: "Id is Invalid",
    id_missing: "Id is not valid mongo ObjectID",
    param_missing: "Missing parameter",
    invalid_email: "Email is Invalid",
    invalid_password: "Password is invalid",
    missing_data: "Data is missing",  
  },
  tag: {
    creation_success : "Tag Created Successfully",
    creation_failed : "Failed to create tag",
    not_found: "Tag not found",
    tags_found: "Tags found",
    tasks_found: "Tasks found",
    validation: {
      missing_name: "Tag name is missing",
      missing_task: "Task id is missing",

    }
  },
  rule: {
    get_success : "Rule fetched Successfully",
    creation_failed : "Failed to create Rule",
    not_found: "Rule not found",
    Rules_found: "Rules found",
    tasks_found: "Tasks found",
    update_success: "Rule Updated Successfully",
    validation: {
      missing_name: "Rule name is missing",
      missing_task: "Task id is missing",

    }
  }
};
