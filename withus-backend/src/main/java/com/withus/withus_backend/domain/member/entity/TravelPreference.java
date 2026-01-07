package com.withus.withus_backend.domain.member.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import java.util.Set;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "travel_preference")
public class TravelPreference {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "travel_preference_id")
    private Long id;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id")
    private Member member;

    @ElementCollection(fetch = FetchType.EAGER)
    @CollectionTable(name = "member_interest", joinColumns = @JoinColumn(name = "travel_preference_id"))
    @Column(name = "interest")
    private Set<String> interests;

    @Enumerated(EnumType.STRING)
    private PlanStyle planStyle;

    @Enumerated(EnumType.STRING)
    private PaceStyle paceStyle;

    @Enumerated(EnumType.STRING)
    private BudgetStyle budgetStyle;

    @Enumerated(EnumType.STRING)
    private FoodStyle foodStyle;

    @Enumerated(EnumType.STRING)
    private LifestyleStyle lifestyleStyle;

    public enum PlanStyle {
        PLANNED, IMPROMPTU
    }

    public enum PaceStyle {
        FAST, BALANCED, RELAXED
    }

    public enum BudgetStyle {
        ECONOMY, MODERATE, LUXURY
    }

    public enum FoodStyle {
        LOCAL, KOREAN
    }

    public enum LifestyleStyle {
        MORNING, NIGHT
    }

    @Builder
    public TravelPreference(Member member, Set<String> interests, PlanStyle planStyle, PaceStyle paceStyle,
            BudgetStyle budgetStyle, FoodStyle foodStyle, LifestyleStyle lifestyleStyle) {
        this.member = member;
        this.interests = interests;
        this.planStyle = planStyle;
        this.paceStyle = paceStyle;
        this.budgetStyle = budgetStyle;
        this.foodStyle = foodStyle;
        this.lifestyleStyle = lifestyleStyle;
    }
}
