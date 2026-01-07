package com.withus.withus_backend.domain.member.dto;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
@NoArgsConstructor
public class MemberOnboardingRequestDto {
    private String nickname;
    private TravelPreferenceRequestDto preferences;
}
