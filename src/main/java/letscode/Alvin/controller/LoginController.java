package letscode.Alvin.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;

import javax.servlet.http.HttpServletRequest;

@Controller
public class LoginController {
    @RequestMapping(value = "/googleSignInCallback", method = {RequestMethod.GET,RequestMethod.POST})
    public String doSessionAssignActionPage(HttpServletRequest request) throws Exception{

        System.out.println("login IN");

        return "Good";
    }
}
