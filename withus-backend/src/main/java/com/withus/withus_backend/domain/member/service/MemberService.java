package com.withus.withus_backend.domain.member.service;

import com.withus.withus_backend.domain.member.dto.LoginRequestDto;
import com.withus.withus_backend.domain.member.dto.MemberOnboardingRequestDto;
import com.withus.withus_backend.domain.member.dto.MemberSignupRequestDto;
import com.withus.withus_backend.domain.member.dto.TokenDto;
import com.withus.withus_backend.domain.member.entity.Member;
import com.withus.withus_backend.domain.member.entity.TravelPreference;
import com.withus.withus_backend.domain.member.repository.MemberRepository;
import com.withus.withus_backend.domain.member.repository.TravelPreferenceRepository;
import com.withus.withus_backend.global.jwt.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberService {

    private final MemberRepository memberRepository;
    private final TravelPreferenceRepository travelPreferenceRepository;
    private final PasswordEncoder passwordEncoder;
    private final AuthenticationManagerBuilder authenticationManagerBuilder;
    private final JwtTokenProvider jwtTokenProvider;

    @Transactional
    public Long signup(MemberSignupRequestDto requestDto) {
        if (memberRepository.existsByEmail(requestDto.getEmail())) {
            throw new IllegalArgumentException("이미 존재하는 이메일입니다.");
        }

        String encodedPassword = passwordEncoder.encode(requestDto.getPassword());

        // Nickname is required by entity, set default derived from email
        String defaultNickname = requestDto.getEmail().split("@")[0];

        Member member = Member.builder()
                .email(requestDto.getEmail())
                .password(encodedPassword)
                .nickname(defaultNickname)
                .role(com.withus.withus_backend.domain.member.entity.Role.USER)
                .socialType(com.withus.withus_backend.domain.member.entity.SocialType.NONE)
                .build();

        return memberRepository.save(member).getId();
    }

    @Transactional
    public TokenDto login(LoginRequestDto requestDto) {
        UsernamePasswordAuthenticationToken authenticationToken = requestDto.toAuthentication();
        Authentication authentication = authenticationManagerBuilder.getObject().authenticate(authenticationToken);
        return jwtTokenProvider.generateToken(authentication);
    }

    @Transactional
    public void submitOnboarding(Long memberId, MemberOnboardingRequestDto requestDto) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("존재하지 않는 회원입니다."));

        // Update Nickname
        if (requestDto.getNickname() != null && !requestDto.getNickname().isBlank()) {
            if (memberRepository.existsByNickname(requestDto.getNickname())
                    && !member.getNickname().equals(requestDto.getNickname())) {
                throw new IllegalArgumentException("이미 존재하는 닉네임입니다.");
            }
            member.updateNickname(requestDto.getNickname());
        }

        // Save Preferences
        if (requestDto.getPreferences() != null) {
            TravelPreference preference = TravelPreference.builder()
                    .member(member)
                    .interests(requestDto.getPreferences().getInterests())
                    .planStyle(requestDto.getPreferences().getPlanStyle())
                    .paceStyle(requestDto.getPreferences().getPaceStyle())
                    .budgetStyle(requestDto.getPreferences().getBudgetStyle())
                    .foodStyle(requestDto.getPreferences().getFoodStyle())
                    .lifestyleStyle(requestDto.getPreferences().getLifestyleStyle())
                    .build();

            travelPreferenceRepository.save(preference);
        }
    }
}
