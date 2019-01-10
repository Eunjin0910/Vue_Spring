package letscode.Alvin.controller;

import letscode.Alvin.exceptions.NotFoundException;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("message")
public class MessaggeController {
    private int counter = 4;

    public List<Map<String,String>> messages = new ArrayList<Map<String,String>> () {{
       add(new HashMap<String,String>() {{ put("id", "1"); put("text","First Message"); }});
       add(new HashMap<String,String>() {{ put("id", "2"); put("text","Second Message"); }});
       add(new HashMap<String,String>() {{ put("id", "3"); put("text","Third Message"); }});
    }};

    @GetMapping
    public List<Map<String,String>> list() {
        return messages;
    }

    @GetMapping("{id}")
    public Map<String,String> getOne(@PathVariable String id) {
        return getMessage(id);
    }

    private Map<String,String> getMessage(@PathVariable String id){
        return messages.stream()
                .filter(message ->message.get("id").equals(id))
                .findFirst()
                .orElseThrow(NotFoundException::new);
    }

    @PostMapping
    public Map<String,String> create(@RequestBody Map<String,String> message) {
        message.put("id", String.valueOf(counter++));

        messages.add(message);

        return message;
    }

    @PutMapping("{id}")
    public Map<String,String> update(@PathVariable String id,@RequestBody Map<String,String> message) {

        System.out.println("in update");

        Map<String, String> messageFromDB = getMessage(id);

        messageFromDB.putAll(message);
        messageFromDB.put("id",id);

        return messageFromDB;
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable String id){
        Map<String, String> message = getMessage(id);

        messages.remove(message);
    }
}
