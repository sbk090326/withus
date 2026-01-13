package com.withus.withus_backend.domain.member.repository;

import com.withus.withus_backend.domain.member.entity.Member;
import com.withus.withus_backend.domain.member.entity.TravelPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.Optional;

public interface TravelPreferenceRepository extends JpaRepository<TravelPreference, Long> {
    Optional<TravelPreference> findByMember_Id(Long memberId);
    boolean existsByMember_Id(Long memberId);
}
