{{- define "pkid.FULL_NAME" -}}
{{- if .Values.fullnameOverride -}}
{{- .Values.fullnameOverride | trunc 63 | trimSuffix "-" -}}
{{- else -}}
{{- printf "%s-%s" .Release.Name .Chart.Name | trunc 63 | trimSuffix "-" -}}
{{- end -}}
{{- end -}}


{{- define "pkid.IMAGE" -}}
{{- .Values.global.PKID_IMAGE -}}
{{- end -}}


{{- define "pkid.REDIS_URL" -}}
{{- .Values.global.REDIS_URL -}}
{{- end -}}

{{- define "pkid.REDIS_PASSWORD" -}}
{{- .Values.global.REDIS_PASSWORD -}}
{{- end -}}


{{- define "pkid.AUTH_BACKEND_URL" -}}
{{- .Values.global.AUTH_BACKEND_URL -}}
{{- end -}}
