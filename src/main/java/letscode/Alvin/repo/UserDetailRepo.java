package letscode.Alvin.repo;

import letscode.Alvin.domain.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserDetailRepo extends JpaRepository<User, String> {
}
