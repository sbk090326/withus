package com.withus.withus_backend.domain.member.repository;

import com.withus.withus_backend.domain.member.entity.Member;
import com.withus.withus_backend.domain.member.entity.TravelPreference;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface TravelPreferenceRepository extends JpaRepository<TravelPreference, Long> {
    Optional<TravelPreference> findByMember(Member member);
}
