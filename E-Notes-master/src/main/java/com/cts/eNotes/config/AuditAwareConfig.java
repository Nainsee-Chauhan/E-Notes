package com.cts.eNotes.config;

import java.util.Optional;

import org.springframework.data.domain.AuditorAware;

import com.cts.eNotes.model.User;
import com.cts.eNotes.util.CommonUtil;

public class AuditAwareConfig implements AuditorAware<Integer>{
	@Override
	public Optional<Integer> getCurrentAuditor() {
		User loggedInUser = CommonUtil.getLoggedInUser();
		return Optional.of(loggedInUser.getId());
	}
}
