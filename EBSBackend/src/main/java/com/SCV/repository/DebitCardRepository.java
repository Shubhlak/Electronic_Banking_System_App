package com.SCV.repository;

import com.SCV.entity.DebitCard;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface DebitCardRepository extends JpaRepository<DebitCard, String> {
    List<DebitCard> findByAccountAccountNo(String accountNo);
}
