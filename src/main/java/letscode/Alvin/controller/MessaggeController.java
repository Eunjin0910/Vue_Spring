package letscode.Alvin.controller;

import letscode.Alvin.domain.Message;
import letscode.Alvin.repo.MessageRepo;
import org.springframework.beans.BeanUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.time.LocalDateTime;
import java.util.List;

@RestController
@RequestMapping("message")
public class MessaggeController {
    private final MessageRepo messageRepo;

    @Autowired
    public MessaggeController(MessageRepo messageRepo) {
        this.messageRepo = messageRepo;
    }

    @GetMapping
    public List<Message> list() {
        return messageRepo.findAll();
    }

    @GetMapping("{id}")
    public Message getOne(@PathVariable("id") Message message) {
        return message;
    }

    @PostMapping
    public Message create(@RequestBody Message message) {
        message.setCreationDate(LocalDateTime.now());
        return messageRepo.save(message);
    }

    @PutMapping("{id}")
    public Message update(@PathVariable("id") Message messageFormDb, @RequestBody Message message) {

        BeanUtils.copyProperties(message,messageFormDb,"id");
        messageFormDb.setUpdatingDate(LocalDateTime.now());

        return messageRepo.save(messageFormDb);
    }

    @DeleteMapping("{id}")
    public void delete(@PathVariable("id") Message message){
        messageRepo.delete(message);
    }
}
