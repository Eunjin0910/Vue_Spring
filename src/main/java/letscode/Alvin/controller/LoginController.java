package letscode.Alvin.controller;

import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

import java.security.Principal;

@RestController
public class LoginController {
    @RequestMapping(value = "/", method = RequestMethod.GET)
    public Principal home(Principal principal) throws Exception{
        return principal;
    }
}
