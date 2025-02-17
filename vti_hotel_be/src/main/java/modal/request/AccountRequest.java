package modal.request;

import lombok.Data;

import modal.entity.account.Account;
import modal.entity.account.Gender;
import modal.entity.account.Role;
import org.antlr.v4.runtime.misc.NotNull;

import static support.ConvertString.convertToEnum;
import static support.ConvertString.convertToLocalDate;

@Data
public class AccountRequest {
    private String fullName;
    @NotNull
    private String username;
    private String password;
    @NotNull
    private String email;

    private String phoneNumber;
    private String imageCard;
    private String birthDate;

    private String gender;
    private String status;
    private String role;

    public void populateAccount(Account account ) throws  Exception{
        account.setFullName(fullName);
        account.setPassword(password);
        account.setEmail(email);
        account.setUsername(username);
        account.setPhoneNumber(phoneNumber);
        account.setBirthDate(convertToLocalDate(birthDate));
        account.setImageCard(imageCard);
        account.setGender(convertToEnum(Gender.class, gender));

    }
    public void updateAccount(Account account) throws Exception {
        account.setFullName(fullName);
        account.setEmail(email);
        account.setPhoneNumber(phoneNumber);
        account.setPassword(password);

        account.setImageCard(imageCard);
        account.setGender(convertToEnum(Gender.class, gender));
    }


    public Account createAccount() throws Exception {
        Account account = new Account();
        account.setUsername(username);
//        account.setLevel(convertToEnum(Account.Level.class, level));
//        account.setAmountSpent(Double.parseDouble(amountSpending));
//        account.setCumulativePoints(Integer.parseInt(cumulativePoint));
        account.setImageCard(imageCard);
        account.setRole(convertToEnum(Role.class, role));
        account.setGender(convertToEnum(Gender.class, gender));
//        account.setStatus(convertToEnum(Account.StatusAccount.class, status));
        populateAccount(account);
        return account;
    }
}
