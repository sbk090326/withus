package com.withus.withus_backend.domain.member.dto;

import com.withus.withus_backend.domain.member.entity.TravelPreference.BudgetStyle;
import com.withus.withus_backend.domain.member.entity.TravelPreference.FoodStyle;
import com.withus.withus_backend.domain.member.entity.TravelPreference.LifestyleStyle;
import com.withus.withus_backend.domain.member.entity.TravelPreference.PaceStyle;
import com.withus.withus_backend.domain.member.entity.TravelPreference.PlanStyle;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.Set;

@Getter
@Setter
@NoArgsConstructor
public class TravelPreferenceRequestDto {
    private Set<String> interests;
    private PlanStyle planStyle;
    private PaceStyle paceStyle;
    private BudgetStyle budgetStyle;
    private FoodStyle foodStyle;
    private LifestyleStyle lifestyleStyle;
}
