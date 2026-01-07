package com.withus.withus_backend.domain.member.controller;

import com.withus.withus_backend.domain.member.dto.MemberOnboardingRequestDto;
import com.withus.withus_backend.domain.member.dto.MemberSignupRequestDto;
import com.withus.withus_backend.domain.member.dto.LoginRequestDto;
import com.withus.withus_backend.domain.member.dto.TokenDto;
import com.withus.withus_backend.domain.member.service.MemberService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.net.URI;

@RestController
@RequestMapping("/api/v1/members")
@RequiredArgsConstructor
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    public ResponseEntity<Long> signup(@Valid @RequestBody MemberSignupRequestDto requestDto) {
        Long memberId = memberService.signup(requestDto);
        return ResponseEntity.created(URI.create("/api/v1/members/" + memberId)).body(memberId);
    }

    @PostMapping("/login")
    public ResponseEntity<TokenDto> login(@RequestBody LoginRequestDto requestDto) {
        return ResponseEntity.ok(memberService.login(requestDto));
    }

    @PostMapping("/onboarding")
    public ResponseEntity<Void> submitOnboarding(
            @org.springframework.security.core.annotation.AuthenticationPrincipal org.springframework.security.core.userdetails.UserDetails userDetails,
            @RequestBody MemberOnboardingRequestDto requestDto) {
        Long memberId = Long.parseLong(userDetails.getUsername());
        memberService.submitOnboarding(memberId, requestDto);
        return ResponseEntity.ok().build();
    }
}
